import { InputSchema } from '../model/schema.js';
import { TouristDetails } from '../model/userSchema.js';
import Jwt from 'jsonwebtoken';
import fs from "fs"
import bcrypt from "bcryptjs"
import multer from "multer"
const { sign, verify } = Jwt
import('dotenv')
const SECRET_KEY = "qwertyuioplllllkjhgfdsazxcvbnm"

export const addDestination = (req, res, next) => {
    const { title, message, tags } = req.body

    const guide = new InputSchema({
        title: title,
        message: message,
        tags: tags,
        image: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/jpg"
        }
    })
    // console.log(req.file.filename,"filename")
    guide.save((err, data) => {
        if (err) {
            res.send(err)
        }
        res.send({
            status: 200,
            message: "Destination is added",
            data: data
        })
    })
}

export const getDestinationbyTag = (req, res) => {
    InputSchema.findOne({ tags: req.params.tags }, (err, data) => {
        if (err) {
            res.send({
                status: 400,
                message: "data cannot be retrived",
            })
        }
        else {
            return res.send({
                status: 200,
                message: "Data retrived",
                data: [data]
            })
        }
    })
}

export const searchDestination = (req, res, next) => {
    console.log(req.params)
    InputSchema.findOne({ title: req.params.title },
        (err, data) => {
            if (err) {
                res.send(err)
            }
            else {
                if (!data) {
                    return res.send("enter destination that is already present")
                }
                return res.send({
                    status: 200,
                    message: "data is collected",
                    data: [data]
                })
            }
        })
}

export const getAlldestination = (req, res) => {
    InputSchema.find(function (err, data) {
        if (err) {
            res.send({
                status: 400,
                message: "data cannot be retrived"
            })
        }
        else {
            return res.send({
                status: 200,
                message: "Data retrived",
                data: data
            })
        }
    })
}

export const createUser = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body

    let existingTourist;

    try {
        existingTourist = await TouristDetails.findOne({ email: email })
    } catch (err) { console.log(err) }

    if (existingTourist) {
        return res.send({
            status: 401,
            message: "Only one Tourist for one Email"
        })
    }

    const hashed = bcrypt.hashSync(password)
    const credentials = new TouristDetails({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: hashed,
        userimage: {
            data: fs.readFileSync("profilepic/" + req.file.filename),
            contentType: "image/png"
        }
    })
    credentials.save((err, data) => {
        if (err) {
            res.send(err)
        }
        res.send({
            status: 201,
            message: "user is created",
            data: data
        })
    })
}

export const loginTourist = async (req, res, next) => {
    const { email, password } = req.body

    let existingTourist;
    try {
        existingTourist = await TouristDetails.findOne({ email: email })
    } catch (err) {
        console.log(err)
    }
    if (!existingTourist) {
        return res.send({
            status: 400,
            message: "Tourist is not registered"
        })
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingTourist.password)
    if (!isPasswordCorrect) {
        return res.send({
            status: 400,
            message: "password is incorrect"
        })
    }
    const token = sign({ id: existingTourist._id }, SECRET_KEY, { expiresIn: "60s" })

    res.cookie(String(existingTourist._id), token, {
        path: "/",
        expiresIn: new Date(Date.now() + 1000 * 60),
        httpOnly: true,
        sameSite: "lax",
    })

    return res.send({
        status: 200,
        message: "Welcome dear Tourist",
        user: existingTourist,
        token
    })
}

export const VerifyToken = (req, res, next) => {
    const cookies = req.headers.cookie
    // const headers = req.headers['authorization']
    const token = cookies.split("=")[1];
    if (!token) {
        res.send({
            status: 404,
            message: "no token found"
        })
    }
    verify(String(token), SECRET_KEY, (err, user) => {
        if (err) {
            res.send({
                status: 400,
                message: "invalid token is used here"
            })
        }
        console.log(user._id,"userid")
        req.id = user.id
    })
    next()
}

export const findTourist = async (req, res) => {
    const userId = req.id
    TouristDetails.findById(userId, "-password",
        (err, data) => {
            if (err) {
                res.send(err)
            }
            else {
                if (!data) {
                    res.send({
                        status: 404,
                        message: "Tourist does not exist"
                    })
                }
                return res.send({
                    status: 200,
                    message: "Welcome Tourist",
                    data: {data}
                })
            }
        })
}
