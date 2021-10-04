const mongoose = require("mongoose");
const mongooseUrl = "mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&ssl=false";

const connectToMongoDB = () => {
    mongoose.connect(mongooseUrl, () => {
        console.log("Connected to Mongoose Successfully!!")
    })
}

module.exports = connectToMongoDB;