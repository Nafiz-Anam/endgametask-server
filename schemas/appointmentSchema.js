const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    doc_name: {
        type: String,
        require: true,
    },
    pat_name: {
        type: String,
        require: true,
    },
    pat_email: {
        type: String,
        require: true,
    },
    pat_phone: {
        type: String,
        require: true,
    },
    pat_address: {
        type: String,
        require: true,
    },
    apnt_date: {
        type: String,
        require: true,
    },
    apnt_time: {
        type: String,
        require: true,
    },
});

module.exports = appointmentSchema;
