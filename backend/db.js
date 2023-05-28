const mongoose = require("mongoose")

// const mongoURI = "mongodb://127.0.0.1:27017/ecommerce"

const connectTomongo = () =>{
    mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  
    })
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    }); 
}
module.exports = connectTomongo;