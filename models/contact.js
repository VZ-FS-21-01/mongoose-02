const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contactSchema = new Schema({
    // Vornamen benötigt
    // nachname benötigt
    // email benötigt
    // age nicht benötigt
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    // age: {
    //     type: Number,
    //     required: false
    // }
    age: Number,
    interest: Array
}, { timestamps: true })

const Contact = mongoose.model('contact', contactSchema)

module.exports = Contact