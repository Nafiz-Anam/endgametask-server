const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const reviewHandler = require("./routerHandler/reviewHandler");
const doctorHandler = require("./routerHandler/doctorHandler");
const appointmentHandler = require("./routerHandler/appointmentHandler");
const servicesHandler = require("./routerHandler/servicesHandler");
const userHandler = require("./routerHandler/userHandler");
const mongoose = require("mongoose");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.npgzr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

async function run() {
    try {
        mongoose.connect(
            uri,
            { useNewUrlParser: true, useUnifiedTopology: true },
            () => console.log(" Mongoose is connected")
        );
        // all collections
        app.use("/review", reviewHandler);
        app.use("/doctor", doctorHandler);
        app.use("/appointment", appointmentHandler);
        app.use("/services", servicesHandler);
        app.use("/user", userHandler);
    } finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("Hello from Ph-Clinic");
});

app.listen(port, () => {
    console.log(`listening at ${port}`);
});
