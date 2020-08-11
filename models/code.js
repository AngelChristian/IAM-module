var mongoose = require("mongoose");

const codeSchema = new mongoose.Schema({
    user_Id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    code: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

module.exports = mongoose.model("Code", codeSchema);