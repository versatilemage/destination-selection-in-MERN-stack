import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import multer from "multer"
const PORT = 6001
const app = express()

app.use(bodyParser.json())

app.use(cors())

app.use(bodyParser.urlencoded({extended: true}))

import {addDestination,
        searchDestination,
        getAlldestination} from "./routes/routes.js"

mongoose.connect("mongodb+srv://wildbadger:jkhinpiqosq@clusterbankapp.pn7rge3.mongodb.net/?retryWrites=true&w=majority",{
  useNewUrlParser: true,
  useUnifiedtopology: true
},(err) => {
  if(!err){
    console.log("connected to db")
  }else{
    console.log("error")
  }
})

const Storage = multer.diskStorage({
    destination:function (req, file, cb) {
        cb(null, 'uploads')
      },
    
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${file.originalname} - ${uniqueSuffix}`)
    }
})

const upload = multer({
    storage: Storage,
    limits: {
        fileSize: 900000,
      },
}).single("image")

app.post("/newdestination", upload, addDestination)

app.get("/getdestination/:title", searchDestination)

app.get("/allplace",getAlldestination)

app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
})
