const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    doc_img: {
        type: String,
        required: true,
    },
    doc_name: {
        type: String,
        required: true,
    },
    doc_designation: {
        type: String,
        required: true,
    },
    doc_category: {
        type: String,
    },
    doc_description: {
        type: String,
        required: true,
    },
    doc_email: {
        type: String,
        required: true,
    },
    doc_phone: {
        type: String,
        required: true,
    },
});

module.exports = doctorSchema;
