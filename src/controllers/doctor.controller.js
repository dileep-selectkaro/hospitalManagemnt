const Doctor = require('../models/doctor.model');

//============ Create doctor =====================
exports.createDoctor = async (req, res) => {
    const doctor = new Doctor({
        name: req.body.name,
        specialization: req.body.specialization,
        fees:req.body.fees,
        hospital:req.body.hospital
    });

    try {
        const newDoctor = await doctor.save();
        res.status(201).json(newDoctor);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// =============== Get all doctors================
exports.getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//=================Get a single doctor =====================
exports.getDoctorById = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//===============Update a doctor ========================
exports.updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            doctor.name = req.body.name;
            doctor.specialization = req.body.specialization;
            doctor.fees=req.body.fees;
            const updatedDoctor = await doctor.save();
            res.json(updatedDoctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//===============search Doctor ==========================
exports.searchDoctor = async (req, res) => {
    try {
        const { name } = req.query;

        // Check if name parameter is provided
        if (!name) {
            return res.status(400).json({ message: 'Name is required for search' });
        }

        const doctor = await Doctor.findOne({ name: { $regex: new RegExp(name, "i") } });

        if (doctor) {
            res.json(doctor);
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//==================Delete a doctor======================
exports.deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (doctor) {
            await doctor.deleteOne();
            res.json({ message: 'Doctor deleted' });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
