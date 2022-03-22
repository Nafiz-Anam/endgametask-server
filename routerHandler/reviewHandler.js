const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const reviewSchema = require("../schemas/reviewSchema");
const Review = new mongoose.model("Review", reviewSchema);

router.get("/", async (req, res) => {
    await Review.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Review data retrieve successfully!",
            });
        }
    });
});
router.post("/", async (req, res) => {
    const newReview = new Review(req.body);
    await newReview.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Review added successfully!",
            });
        }
    });
});
router.delete("/:id", async (req, res) => {});

module.exports = router;
