const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true }).plugin(require('mongoose-autopopulate'))

const Model = mongoose.model("organizations", schema)

module.exports = Model;