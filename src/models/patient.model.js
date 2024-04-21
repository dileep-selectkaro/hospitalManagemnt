const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,    
    unique: true,
    trim: true,
  },
  age:{
   type:Number,
   required:true,

  },
  password: {
     type: String, 
    required: true, 
    trim: true 
},


},{timestamps:true});

module.exports = mongoose.model("patient", patientSchema);
