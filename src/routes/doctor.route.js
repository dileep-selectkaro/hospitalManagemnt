const express = require("express");
const route = express.Router(); 
const {createDoctor,getAllDoctors,getDoctorById,updateDoctor,searchDoctor,deleteDoctor} = require("../controllers/doctor.controller");

route.post("/createDoctor",createDoctor);
route.get("/getAllDoctors",getAllDoctors);
route.get("/getDoctorById/:id",getDoctorById);
route.put("/updateDoctor/:id",updateDoctor);
route.get("/searchDoctor",searchDoctor);
route.delete("/deleteDoctor/:id",deleteDoctor);

module.exports = route; 
