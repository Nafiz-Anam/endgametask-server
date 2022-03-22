const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    doc_img: {
        type: Buffer,
        contentType: String,
        required: true,
    },
    doc_name: {
        type: String,
        require: true,
    },
    doc_designation: {
        type: String,
        require: true,
    },
    doc_category: {
        type: String,
        require: true,
    },
    doc_description: {
        type: String,
        require: true,
    },
    doc_email: {
        type: String,
        require: true,
    },
    doc_phone: {
        type: String,
        require: true,
    },
});

module.exports = doctorSchema;
