const mongoose = require("mongoose");

const servicesSchema = mongoose.Schema({
    doc_id: {
        type: String,
        require: true,
    },
    doc_name: {
        type: String,
        require: true,
    },
    doc_services: [
        {
            price: {
                type: String,
                require: true,
            },
            label: {
                type: String,
                require: true,
            },
        },
    ],
});

module.exports = servicesSchema;
