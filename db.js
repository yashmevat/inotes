const mongoose = require("mongoose")

const connectToDb = async()=>{
      const conn = await mongoose.connect("mongodb+srv://yashmevat16:yashmevat@cluster0.bi4podh.mongodb.net/user-db?retryWrites=true&w=majority&appName=Cluster0");
      if(conn){
        console.log("connected");
      }
}
module.exports = connectToDb