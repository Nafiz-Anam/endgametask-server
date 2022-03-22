const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const { ObjectId } = require("mongodb");
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
    })
        .clone()
        .catch(function (err) {
            console.log(err);
        });
});
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(req.query);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.size);
    try {
        const reviews = await Review.find({ doc_id: id, status: "approve" })
            .limit(limit * 1)
            .skip(page * limit)
            .exec();

        // const count = reviews.length;
        const count = await Review.find({
            doc_id: id,
            status: "approve",
        }).countDocuments();

        res.json({
            reviews,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count,
        });
    } catch (err) {
        console.error(err.message);
    }
    // await Review.find({ doc_id: id, status: "approve" })
    //     .exec()
    //     .then((docs) => {
    //         const response = {
    //             count: docs.length,
    //             result: docs,
    //         };
    //         res.status(200).json(response);
    //     });
    // await Review.find({ doc_id: id }, (err, data) => {
    //     if (err) {
    //         res.status(500).json({
    //             error: "There was a server side error!",
    //         });
    //     } else {
    //         res.status(200).json({
    //             result: data,
    //             message: "Doctor Review data retrieve successfully!",
    //         });
    //     }
    // })
    //     .clone()
    //     .catch(function (err) {
    //         console.log(err);
    //     });
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
router.put("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await Review.updateOne(
        { _id: ObjectId(id) },
        {
            $set: {
                status: "approve",
            },
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "Review updated successfully!",
                });
            }
        }
    )
        .clone()
        .catch(function (err) {
            console.log(err);
        });
});
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };
    const result = await Review.deleteOne(query);
    res.send(result);
});

module.exports = router;
