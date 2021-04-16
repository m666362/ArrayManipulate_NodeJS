const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "users",
        autopopulate: { maxDepth: 1 }
    },
    org: {
        type: mongoose.Types.ObjectId,
        ref: "orgs",
        autopopulate: { maxDepth: 1 }
    },
    amount: {
        type: Number,
        default: 0
    }
}, { timestamps: true }).plugin(require('mongoose-autopopulate'))

const Model = mongoose.model("trans", schema)

module.exports = Model;