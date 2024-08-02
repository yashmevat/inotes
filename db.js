const mongoose = require("mongoose")

const connectToDb = async()=>{
      const conn = await mongoose.connect("mongodb://localhost:27017/user-db");
      if(conn){
        console.log("connected");
      }
}
module.exports = connectToDb