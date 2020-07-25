const mongoose = require('mongoose');

const connectDB = async () => {
 try{
     const conn = await mongoose.connect(process.env.MONGO_URI,{
         useNewUrlParser:true,
         useCreateIndex:true,
         useFindAndModify:true,
         useUnifiedTopology:true
     });

     console.log(`MongoDB Connected: ${conn.connection.host}`)
 }catch(err){
     console.log(err);
     process.exit(1) //Exit with failure to 1
 }
}

module.exports = connectDB;