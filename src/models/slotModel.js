const mongoose = require("mongoose");

const slotScheme = new mongoose.Schema({
    chat_id : {
        type: String,
        unique: true
    },
    last_updated: {
        type: String,
    },
    slots: [{
        session_id: String,
        date: {
            type: String,
            default: "Undefinded"
        },
        name: {
            type: String,
            default: "Undefinded"
        },
        address: {
            type: String,
            default: "Undefinded" 
        },       
        vaccine: {
            type: String,
            default: "Undefinded" 
        },
        pincode: {
            type: Number,
            default: 0
        },
        district_name: {
            type: String,
            default: "Undefinded"
        },
        age: {
            type: Number,
            default: 0
        },
        available: {
            type: Number,
            default: 0
        },
        dose1: {
            type: Number,
            default: 0
        },
        dose2: {
            type: Number,
            default: 0
        },
        fee: {
            type: String,
            default: "Undefinded"
        }
    }]
});

// Collection 

const Slot = new mongoose.model('Slot', slotScheme);

module.exports = Slot;