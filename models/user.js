const { Schema, Types, model } = require('mongoose');

const userModel = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    appointments: [{ type: String, ref: "appointment" }]
})

const User = model("user", userModel);

module.exports = User;