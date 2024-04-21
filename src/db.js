const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MongoURI||"mongodb+srv://dileepkm:L3cuCdGwQQWTF3Hs@cluster0.iqkms8u.mongodb.net/hospitalManage");
    console.log('MongoDB connected Successfully');
  } catch (err) {
    console.error("Unable to connect to MongoDB",err.message);

  }
};

module.exports = connectDB;
