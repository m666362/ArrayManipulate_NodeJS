const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0,
    }
}, { timestamps: true }).plugin(require('mongoose-autopopulate'))

const User = mongoose.model("users", userSchema)

module.exports = User;