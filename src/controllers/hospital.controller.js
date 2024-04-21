const Hospital = require('../models/hospital.model');


//============Create hospital======================
exports.createHospital = async (req, res) => {
    const hospital = new Hospital({
        name: req.body.name,
        location: req.body.location
    });

    try {
        const newHospital = await hospital.save();
        res.status(201).json(newHospital);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//============== Get all hospitals==========================
exports.getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();
        res.json(hospitals);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//=============Get a single hospital================
exports.getHospitalById = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (hospital) {
            res.json(hospital);
        } else {
            res.status(404).json({ message: 'Hospital not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//==============Update a hospital====================
exports.updateHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (hospital) {
            hospital.name = req.body.name
            hospital.location = req.body.location
            const updatedHospital = await hospital.save();
            res.json(updatedHospital);
        } else {
            res.status(404).json({ message: 'Hospital not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

//================search Hospital=======================
exports.searchHospital = async (req, res) => {
    try {
        const { name } = req.query;

        // Check if name parameter is provided
        if (!name) {
            return res.status(400).json({ message: 'Name is required for search' });
        }
        const  hospital = await  Hospital.findOne({ name: { $regex: new RegExp(name, "i") } });

        if (hospital) {
            res.json(hospital);
        } else {
            res.status(404).json({ message: 'Hospital not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ============Delete a hospital===================
exports.deleteHospital = async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (hospital) {
            await hospital.deleteOne();
            res.json({ message: 'Hospital deleted' });
        } else {
            res.status(404).json({ message: 'Hospital not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
