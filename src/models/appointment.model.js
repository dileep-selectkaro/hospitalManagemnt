const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: { 
    type: mongoose.Schema.Types.ObjectId,
     ref: "Doctor" 
},
  patient: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "Patient" },
    date: {
       type: String,
       required:true
    },
    time: {
        type: String,
        required:true
     },
    hospital:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Hospital" 
    }
},{timestamps:true});

module.exports = mongoose.model("appointment", appointmentSchema);
