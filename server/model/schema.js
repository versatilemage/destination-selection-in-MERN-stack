import mongoose from "mongoose";

const TourSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    tags: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String
    },
    time: {
        type: String,
        required: true
    },
    creator: {
        type: String
    }
})

export const InputSchema = mongoose.model("Tourspot",TourSchema)