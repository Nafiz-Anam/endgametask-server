const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    reviewer_name: {
        type: String,
        required: true,
    },
    doc_name: {
        type: String,
        required: true,
    },
    doc_id: {
        type: String,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["approve", "disapprove"],
        required: true,
    },
});

module.exports = reviewSchema;
