const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true,  
    },
    location:{
        type: String,
        required:true,
    }
    
},{timestamps:true});

module.exports = mongoose.model('hospital', hospitalSchema);
