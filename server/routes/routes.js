import { InputSchema } from '../model/schema.js';
import Jwt from 'jsonwebtoken';
import multer from "multer"
const {sign, verify} = Jwt
import('dotenv')

export const addDestination = (req, res, next) => {
    const {title, message, tags} = req.body

    const guide = new InputSchema({
        title: title,
        message: message,
        tags: tags,
        image:{
            data:req.file.filename,
            contentType:"image/jpg"
        }
    })
    console.log(req.file.filename,"filename")
    guide.save((err, data) => {
        if(err){
            res.send(err)
        }
        res.send({
            status: 200,
            message: "Destination is added",
            data: data
        })
    })
}

export const searchDestination = (req, res, next) => {
    console.log(req.params)
    InputSchema.findOne({title: req.params.title},
        (err, data) => {
            if(err){
                res.send(err)
            }
            else {
                if(!data){
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
    InputSchema.find(function(err, data) {
        if(err){
            res.send({
                status: 400,
                message: "data cannot be retrived"
            })
        }
        else{
            return res.send({
                status: 200,
                message: "Data retrived",
                data: data
            })
        }
    })
}
