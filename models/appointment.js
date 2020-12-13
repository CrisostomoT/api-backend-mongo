const { Schema, Types, model } = require('mongoose');

const appointmentModel = new Schema({
    date: { type: Date, required: false },
    user: { type: String, required: true, ref: "user" },
    service: { type: String, required: true },
    notes: { type: String, required: false },
})

const Appointment = model("appointment", appointmentModel);

module.exports = Appointment;