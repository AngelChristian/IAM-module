 var mongoose = require("mongoose");

 
const utmSchema = new mongoose.Schema({
    utm:[{
        id:{type:string},
        UTM_parameters:{type:string},
        created_at: {type:Date},
        Activity: {default:"sign_up"}}]
});

module.exports = mongoose.model("utm", utmSchema);