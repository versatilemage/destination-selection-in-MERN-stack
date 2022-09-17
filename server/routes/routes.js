import { InputSchema } from '../model/schema.js';
import { TouristDetails } from '../model/userSchema.js';
import Jwt from 'jsonwebtoken';
import Moment from "moment";
import fs from "fs";
import bcrypt from "bcryptjs";
import multer from "multer"
const { sign, verify } = Jwt
import * as dotenv from 'dotenv'
const SECRET_KEY = "qwertyuioplllllkjhgfdsazxcvbnm";

export const addDestination = (req, res, next) => {
    const { title, message, tags } = req.body
    const myDate = Moment().format('YYYYMMDD HH:mm')

    const guide = new InputSchema({
        title: title,
        message: message,
        tags: tags,
        time: myDate,
        image: {
            data: fs.readFileSync("uploads/" + req.file.filename),
            contentType: "image/jpg"
        }
    })
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
};

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
};

export const searchDestination = (req, res, next) => {
    console.log(req.params)
    InputSchema.find({ title: req.params.title },
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
                    data: data
                })
            }
        })
};

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
};

export const createUser = async (req, res, next) => {
    const { firstname, lastname, email, password } = req.body

    let existingTourist;

    try {
        existingTourist = await TouristDetails.findOne({ email: email })
    } catch (err) { console.log(err) }

    if (existingTourist) {
        return res.send({
            status: 400,
            message: "Only one Tourist for one Email"
        })
    //     return res
    //   .status(400)
    //   .json({ message: "User already exists! Login Instead" });
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
};
    // try {
    //     await credentials.save();
    //   } catch (err) {
    //     console.log(err);
    //   }
    //   return res.status(201).json({ message: credentials });
    // };

export const loginTourist = async (req, res, next) => {
    const { email, password } = req.body

    let existingTourist;
    try {
        existingTourist = await TouristDetails.findOne({ email: email })
    } catch (err) {
        console.log(err)
    }
    if (!existingTourist) {
        // return res.send({
        //     status: 400,
        //     message: "Tourist is not registered"
        // })
        return res.status(400).json({ message: "User not found. Signup Please" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingTourist.password)
    if (!isPasswordCorrect) {
        // return res.send({
        //     status: 400,
        //     message: "password is incorrect"
        // })
        return res.status(400).json({ message: "Inavlid Email / Password" });
    }
    const token = sign({ id: existingTourist._id }, SECRET_KEY, { expiresIn: "1h" })

    if (req.cookies[`${existingTourist._id}`]) {
        req.cookies[`${existingTourist._id}`] = "";
      }

    res.cookie(String(existingTourist._id), token, {
        path: "/",
        expiresIn: new Date(Date.now() + 1000 * 3600),
        httpOnly: true,
        sameSite: "lax",
    })

    return res.send({
        status: 200,
        message: "Welcome dear Tourist",
        user: existingTourist,
        token
    })
    // return res
    // .status(200)
    // .json({ message: "Successfully Logged In", user: existingTourist, token });
};

export const VerifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    if (!token) {
        res.send({
            status: 404,
            message: "no token found"
        })
        // res.status(404).json({ message: "No token found" });
    }
    verify(String(token), SECRET_KEY, (err, user) => {
        if (err) {
            res.send({
                status: 400,
                message: "invalid token is used here",
            })
            // return res.status(400).json({ message: "Invalid Token" });
        }
        console.log(user.id,"userid")
        req.id = user.id;
    })
    next();
};

export const findTourist = async (req, res) => {
    const userId = req.id
    // TouristDetails.findById(userId, "-password",
    //     (err, data) => {
    //         if (err) {
    //             res.send(err)
    //         }
    //         else {
    //             if (!data) {
    //                 res.send({
    //                     status: 404
    //                 })
    //             }
    //             return res.send({
    //                 status: 200,
    //                 message: "Welcome Tourist",
    //                 data: data
    //             })
    //         }
    //     })
let user;
  try {
    user = await TouristDetails.findById(userId, "-password");
  } catch (err) {
    return new Error(err);
  }
  if (!user) {
    return res.status(404)
  }
  return res.status(200).json({ user });
};

// export const Refresh = (req, res, next) => {
//     const cookies = req.headers.cookie;
//     const previous = cookies.split("="[1]);

//     if (!previous){
//         return res.status(400).json({message: "no token found"})
//     }
//     verify(String(previous),SECRET_KEY,(err, user) => {
//         if(err){
//             console.log(err)
//             return res.status(403).json({message: "failed the authentication"})
//         }
//         res.clearCookie(`${user.id}`)
//     })
// }
