import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import Moment from "moment";
import multer from "multer"
const PORT = 6001
const app = express()
import * as dotenv from 'dotenv'
dotenv.config()

app.use(bodyParser.json())

app.use(cookieParser())

app.use(cors({credentials: true, origin:"http://localhost:3000"}))

app.use(bodyParser.urlencoded({ extended: true }))

import {
  addDestination,
  searchDestination,
  getAlldestination,
  createUser,
  getDestinationbyTag,
  loginTourist,
  findTourist,
  VerifyToken,
  logout
} from "./routes/routes.js"

mongoose.connect(`mongodb+srv://wildbadger:${process.env.PASSWORD}@clusterbankapp.pn7rge3.mongodb.net/?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedtopology: true
}, (err) => {
  if (!err) {
    console.log("connected to db")
  } else {
    console.log("error")
  }
})

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },

  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.originalname}`)
  }
})

const users = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profilepic')
  },

  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 10000000,
  }
})

const uploadPic = multer({
  storage: users,
  limits: {
    fileSize: 90000000,
  },
});

let myDate = Moment().format('YYYYMMDD HH:mm')
console.log(myDate)

app.post("/newdestination", upload.single("image"), addDestination);

app.get("/getbytitle/:title", searchDestination);

app.get("/getbytags/:key", getDestinationbyTag);

app.get("/allplace", getAlldestination);

app.post("/createuser", uploadPic.single("userimage"), createUser);

app.post("/login", loginTourist);

app.get("/findtourist", VerifyToken, findTourist);

app.post("/logout", VerifyToken, logout)

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`)
})
