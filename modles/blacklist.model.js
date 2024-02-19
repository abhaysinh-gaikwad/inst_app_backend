const mongoose = require("mongoose");

const blackListSchema = mongoose.Schema({
    token : {type: String, required: true, unique: true}
},{
    versionKey: false
});

const BlackListModel = mongoose.model("blacklist", blackListSchema);

module.exports = {
    BlackListModel
}