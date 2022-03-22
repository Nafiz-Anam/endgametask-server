const express = require("express");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const doctorSchema = require("../schemas/doctorSchema");
const Doctor = new mongoose.model("Doctor", doctorSchema);

router.get("/", async (req, res) => {
    await Doctor.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Doctors data retrieve successfully!",
            });
        }
    })
        .clone()
        .catch(function (err) {
            console.log(err);
        });
});
router.get("/masterdoc", async (req, res) => {
    await Doctor.find()
        .select("_id doc_name doc_email")
        .exec()
        .then((docs) => {
            const response = {
                count: docs.length,
                result: docs,
            };
            res.status(200).json(response);
        });
});
router.get("/prodoc", async (req, res) => {
    // const id = req.params.id;
    // console.log(req.query);
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.size);
    try {
        const doctors = await Doctor.find()
            .limit(limit * 1)
            .skip(page * limit)
            .exec();

        // const count = reviews.length;
        const count = await Doctor.countDocuments();

        res.json({
            doctors,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
            total: count,
        });
    } catch (err) {
        console.error(err.message);
    }

    // await Doctor.find()
    //     .select("_id doc_name doc_email")
    //     .exec()
    //     .then((docs) => {
    //         const response = {
    //             count: docs.length,
    //             result: docs,
    //         };
    //         res.status(200).json(response);
    //     });
});
router.get("/:id", async (req, res) => {
    const id = req.params?.id;
    // console.log(id);
    await Doctor.find({ _id: ObjectId(id) }, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Doctor data retrieve successfully!",
            });
        }
    })
        .clone()
        .catch(function (err) {
            console.log(err);
        });
});

router.post("/", async (req, res) => {
    const newDoctor = new Doctor(req.body);
    await newDoctor.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Doctor data added successfully!",
            });
        }
    });
});
// router.post("/", async (req, res) => {
//     console.log("body ", req.body);
//     console.log("file ", req.files);
//     const img = req.files.doc_img;
//     const imgData = img.data;
//     console.log("imgData", imgData);
//     const encodedImg = imgData.toString("base64");
//     console.log("encodedImg", encodedImg);
//     const imageBuffer = Buffer.from(encodedImg, "base64");
//     console.log("imageBuffer", imageBuffer);
//     const newDocData = {
//         doc_img: imgData,
//         doc_name: req.body.doc_name,
//         doc_designation: req.body.doc_designation,
//         doc_category: req.body.doc_category,
//         doc_description: req.body.doc_description,
//         doc_email: req.body.doc_email,
//         doc_phone: req.body.doc_phone,
//     };
//     console.log(newDocData);
//     // res.send("this is data");
//     const newDoctor = new Doctor(newDocData);
//     await newDoctor.save((err) => {
//         if (err) {
//             res.status(500).json({
//                 error: "There was a server side error!",
//             });
//         } else {
//             res.status(200).json({
//                 message: "Doctor data added successfully!",
//             });
//         }
//     });
// });

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };
    const result = await Doctor.deleteOne(query);
    res.send(result);
});

module.exports = router;
