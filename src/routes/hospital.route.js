const express = require("express");
const route = express.Router(); 
const {createHospital,getAllHospitals,getHospitalById,updateHospital,searchHospital,deleteHospital} = require("../controllers/hospital.controller");

route.post("/createHospital",createHospital);
route.get("/getAllHospitals",getAllHospitals);
route.get("/getHospitalById/:id",getHospitalById);
route.put("/updateHospital/:id",updateHospital);
route.get("/searchHospital",searchHospital);
route.delete("/deleteHospital/:id",deleteHospital);

module.exports = route; 
