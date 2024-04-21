const express = require("express");
const route = express.Router(); 
const {signup,signin} = require("../controllers/patient.controller");

route.post("/signup",signup);
route.post("/signin",signin);

module.exports = route; 
