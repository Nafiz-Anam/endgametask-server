const express = require("express");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const User = new mongoose.model("User", userSchema);

router.get("/", async (req, res) => {
    await User.find({}, (err, data) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                result: data,
                message: "Users data retrieve successfully!",
            });
        }
    })
        .clone()
        .catch(function (err) {
            console.log(err);
        });
});
router.post("/", async (req, res) => {
    const newUser = new User(req.body);
    await newUser.save((err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "User added successfully!",
            });
        }
    });
});

router.get("/:email", async (req, res) => {
    const email = req.params.email;
    const query = { email: email };
    const user = await User.findOne(query);
    let isAdmin = false;
    if (user?.role === "admin") {
        isAdmin = true;
    }
    res.json({ admin: isAdmin });
});

router.put("/", async (req, res) => {
    const user = req.body;
    const filter = { email: user.email };
    const options = { upsert: true };
    const updateDoc = { $set: user };
    const result = await User.updateOne(filter, updateDoc, options);
    res.json(result);
});
router.put("/admin", async (req, res) => {
    const user = req.body;
    const filter = { email: user.email };
    const updateDoc = { $set: { role: "admin" } };
    const result = await User.updateOne(filter, updateDoc);
    res.json(result);
});

router.delete("/:id", async (req, res) => {});

module.exports = router;
