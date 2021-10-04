const mongoose = require("mongoose");

const NotesSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    label: {
        type: String,
    },
    date: {
        type: Date,
        require: true,
    },
})

module.exports = mongoose.model("Notes", NotesSchema);