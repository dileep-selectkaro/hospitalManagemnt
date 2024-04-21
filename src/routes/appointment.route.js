const express = require("express");
const route = express.Router(); 
const {createAppointment,getAllAppointments,getAppointmentById,updateAppointment,searchAppoint,deleteAppointment} = require("../controllers/appointment.controller");

route.post("/createAppointment",createAppointment);
route.get("/getAllAppointments",getAllAppointments);
route.put("/updateAppointment/:id",updateAppointment);
route.get("/searchAppoint",searchAppoint);
route.delete("/deleteAppointment/:id",deleteAppointment);

module.exports = route; 
