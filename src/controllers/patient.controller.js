const Patient = require('../models/patient.model');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");

//=================Signup Patient =====================
const signup = async (req, res) => {
  const { name,age, email, password } = req.body;
  console.log(age)
  
  // ==========Validation ==========
  if(!name){
    return res.status(400).json({ message: 'Provide Name' });
  }
  if(!email){
    return res.status(400).json({ message: 'Provide email' });
  }
  if(!age){
    return res.status(400).json({ message: 'Provide age' });
  }

  if(!password){
    return res.status(400).json({ message: 'Provide password' });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).json({ message: 'Pls Provide Strong Password' });
  }
  try {

    // email already exists
    let existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: 'Patient with this email already exists' });
    }

    // Hash password 
    const hashedPassword = await bcrypt.hash(password, 10);
    let patient = new Patient({ name,age, email, password: hashedPassword });
    const createdPatient=await patient.save();

    res.json({ message: 'Signup successful',createdPatient });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


//=============== Signin Patient ================
const signin = async (req, res) => {
  const data = req.body;
  const { email, password } = data;

  // Validation
  if (!email) {
    return res.status(400).json({ message: 'Provide email' });
  }

  if (!password) {
    return res.status(400).json({ message: 'Provide password' });
  }

  try {
    const patient = await Patient.findOne({ email });

    // check  Patient exists
    if (!patient) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, patient.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ PatientId: patient._id, email: patient.email }, 'your_secret_key', {
      expiresIn: '7d' 
    });
    res.status(200).json({message:"Patient Sucessfully Login", token });
    return token;
  } catch (error) {
    console.error('Error signin', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports = { signup,signin };



