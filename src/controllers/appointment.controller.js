const Appointment = require("../models/appointment.model");

//==== Create a appointment=============
exports.createAppointment = async (req, res) => {
  const appointment = new Appointment({
    doctor: req.body.doctor,
    patient: req.body.patient,
    hospital: req.body.hospital,
    date: req.body.date,
    time: req.body.time,
  });

  try {
    const newAppointment = await appointment.save();
    res.status(201).json(newAppointment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//====== Get all appointments=====================
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//============== Update an appointment===========
exports.updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      appointment.doctor = req.body.doctor;
      appointment.patient = req.body.patient;
      appointment.hospital = req.body.hospital;
      appointment.date = req.body.date;
      appointment.time = req.body.time;
      const updatedAppointment = await appointment.save();
      res.json(updatedAppointment);
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ============search appointmrnt by date ,time, patientId,doctorId ===============
exports.searchAppoint = async (req, res) => {
  try {
    const { time, date, patientId, doctorId } = req.query;
    let query = {};

    if (time) {
      query.time = time;
    }
    if (date) {
      query.date = date;
    }
    if (patientId) {
      query.patient = patientId;
    }
    if (doctorId) {
      query.doctor = doctorId;
    }

    if (Object.keys(query).length === 0) {
      return res
        .status(400)
        .json({ message: "At least one parameter is required for search" });
    }

    const appointments = await Appointment.find(query);

    if (appointments.length > 0) {
      res.json(appointments);
    } else {
      res
        .status(404)
        .json({ message: "No appointments found matching the criteria" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//======= Delete an appointment==================
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (appointment) {
      await appointment.deleteOne();
      res.json({ message: "Appointment deleted" });
    } else {
      res.status(404).json({ message: "Appointment not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
