const mongoose = require("mongoose");
const user = require("./userModel");

const notesSchema = new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     description:{
        unique:true,
        type:String,
        required:true
     },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user,
        required:true
     }

})

const notes = mongoose.model("notes",notesSchema);
module.exports = notes;