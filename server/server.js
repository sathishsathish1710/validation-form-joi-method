const express = require('express');
const bodyParser = require('body-parser');
const Joi = require('joi');
const cors = require('cors'); // Import cors middleware
const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Define Mongoose schema for user data
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Ensure unique emails
  phone: { type: String },
  password: { type: String, required: true, minlength: 6 }, // Enforce minimum password length
});

// Create Mongoose model for users
const User = mongoose.model('User', userSchema);

// Define Joi schema for validation
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required(), // Ensure password and confirm_password match
  password: Joi.string().min(6).required(),
});

// POST endpoint for form submission with Mongoose integration
app.post('/api/submitForm', async (req, res) => {
  try {
    // Validate form data using Joi
    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Create a new User instance with validated data
    const newUser = new User(value);

    // Save user data to MongoDB using async/await for clarity
    const savedUser = await newUser.save();

    return res.json({ message: 'Form submitted successfully!' });
  } catch (err) {
    console.error(err); // Log errors for debugging
    return res.status(500).json({ error: 'Internal server error' }); // Generic error for client
  }
});

// Connect to MongoDB before starting the server (handle errors)
mongoose.connect('mongodb://localhost:27017/sathish', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});