const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
const MONGODB_URI = "mongodb+srv://admin:KqDZTqjODQhGh8VU@mariajuana.ufrijyx.mongodb.net/?retryWrites=true&w=majority"
try {
  mongoose.connect(MONGODB_URI)
  console.log("Connected to ", mongoose.onnection);
} catch (error) {
  console.error(error);
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected");
});

mongoose.connection.on("disconnected", () => {  
  console.log("Mongoose is disconnected");
});

module.exports = mongoose;