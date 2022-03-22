const express = require("express");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const servicesSchema = require("../schemas/servicesSchema");
const Service = new mongoose.model("DoctorService", servicesSchema);

router.get("/", async (req, res) => {
    await Service.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Doctors services data retrieve successfully!",
            });
        }
    })
        .clone()
        .catch(function (err) {
            console.log(err);
        });
});

router.post("/", async (req, res) => {
    const newServices = new Service(req.body);
    await newServices.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Doctor services data added successfully!",
            });
        }
    });
});

router.delete("/:id", async (req, res) => {});

module.exports = router;
