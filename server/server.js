// Backend: server.js

const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const cors = require('cors'); // Import cors middleware

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Define Joi schema for validation
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// POST endpoint for form submission
app.post('/api/submitForm', (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  } else {
    // Here you would process the form data, for example, save it to a database
    console.log('Submitted data:', value);
    return res.json({ message: 'Form submitted successfully' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
