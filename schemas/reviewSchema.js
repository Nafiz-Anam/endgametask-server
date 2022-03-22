const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
    reviewer_name: {
        type: String,
        require: true,
    },
    review: {
        type: String,
        require: true,
    },
    rating: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        enum: ["approve", "disapprove"],
    },
});

module.exports = reviewSchema;
