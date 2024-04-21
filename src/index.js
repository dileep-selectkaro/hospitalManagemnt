const express = require('express');
const connectDB = require('./db');
const dotenv=require("dotenv");
dotenv.config();
const hospitalRoute = require('./routes/hospital.route');
const patientRoutes=require("./routes/patient.route");
const doctorRoutes=require("./routes/doctor.route");
const appointmentRoutes=require("./routes/appointment.route");
const app = express();
const PORT =process.env.PORT||4000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/hospitals', hospitalRoute);
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);
app.use('/appointments', appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
