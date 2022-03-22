const express = require("express");
const { default: mongoose } = require("mongoose");
const { ObjectId } = require("mongodb");
const router = express.Router();
const appointmentSchema = require("../schemas/appointmentSchema");
const Appointment = new mongoose.model("Appointment", appointmentSchema);

router.get("/", async (req, res) => {
    await Appointment.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Appointment data retrieve successfully!",
            });
        }
    })
        .clone()
        .catch(function (err) {
            console.log(err);
        });
});
router.post("/", async (req, res) => {
    const newAppointment = new Appointment(req.body);
    await newAppointment.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Appointment data added successfully!",
            });
        }
    });
});
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const query = { _id: ObjectId(id) };
    const result = await Appointment.deleteOne(query);
    res.send(result);
});

module.exports = router;
