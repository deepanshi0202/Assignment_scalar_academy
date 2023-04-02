const mongoose = require("mongoose");



const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    uid: {
        type: String,
        required: true,
        unique: true
    },
    evaluation: {
        type: Object,
    },
    evalSubmit: {
        type: Boolean,
        required: true
    },
    mentor: {
        type: String
    },
    mentorName: {
        type: String
    },
    mentorAssigned: {
        type: Boolean,
        requried: true
    }
})

module.exports = mongoose.model("student", StudentSchema);