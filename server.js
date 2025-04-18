require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/user');
console.log("Looking for user model at: ", require.resolve('./models/user'));
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '..', 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,

}).then(() => console.log("MongoDB cloud connected"))
  .catch(err => console.error("MongoDB error:", err));

// API route

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
  });

  // Serve the success page
app.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'success.html'));
});
  

app.post('/submit', async (req, res) => {
  const { name, password } = req.body;

  console.log("Form submitted with:", name, password);
  try {
    const newUser = new User({ name, password });
    await newUser.save();
    res.json({ message: "User saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
