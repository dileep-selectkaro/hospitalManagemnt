const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    hospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hospital"
    }
},{ timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);
