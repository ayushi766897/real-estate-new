const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/property-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin','seller'], default: 'user' },
  status: { type: String, enum: ['Active', 'Blocked'], default: 'Active' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);


// Property Schema
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  beds: { type: Number, required: true },    // Added
  baths: { type: Number, required: true },   // Added
  price: { type: String, required: true },
  image: { type: String, required: true },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Property = mongoose.model('Property', propertySchema);

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);






const FILE_PATH = "../client/src/components/seller/properties.json";

// Load properties
app.get("/properties", (req, res) => {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });
        
        // Parse the JSON and filter out deleted properties
        const allProperties = JSON.parse(data);
        const activeProperties = allProperties.filter(property => !property.deleted);
        
        res.json(activeProperties);
    });
});

app.post("/properties/add", (req, res) => {
  const newProperty = req.body;

  fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: "Error reading file" });

      let properties = JSON.parse(data);
      newProperty.id = properties.length ? properties[properties.length - 1].id + 1 : 1;
      newProperty.blocked = false;
      newProperty.deleted = false;

      properties.push(newProperty);

      fs.writeFile(FILE_PATH, JSON.stringify(properties, null, 2), (err) => {
          if (err) return res.status(500).json({ error: "Error writing file" });
          res.json({ message: "Property added successfully", property: newProperty });
      });
  });
});

app.put("/properties/edit/:id", (req, res) => {
  const propertyId = parseInt(req.params.id);
  const updatedData = req.body;

  fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) return res.status(500).json({ error: "Error reading file" });

      let properties = JSON.parse(data);
      properties = properties.map(property => 
          property.id === propertyId ? { ...property, ...updatedData } : property
      );

      fs.writeFile(FILE_PATH, JSON.stringify(properties, null, 2), (err) => {
          if (err) return res.status(500).json({ error: "Error writing file" });
          res.json({ message: "Property updated successfully", properties });
      });
  });
});

// Block/unblock property
app.put("/properties/block/:id", (req, res) => {
    const propertyId = parseInt(req.params.id);
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Error reading file" });

        let properties = JSON.parse(data);
        properties = properties.map(property => 
            property.id === propertyId ? { ...property, blocked: !property.blocked } : property
        );

        fs.writeFile(FILE_PATH, JSON.stringify(properties, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Error writing file" });
            res.json({ message: "Property status updated", properties });
        });
    });
});

// Delete property
app.delete("/properties/delete/:id", (req, res) => {
  const propertyId = parseInt(req.params.id);
  fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) {
          console.error("Error reading file:", err);
          return res.status(500).json({ error: "Error reading file" });
      }

      let properties = JSON.parse(data);
      const propertyIndex = properties.findIndex((property) => property.id === propertyId);

      if (propertyIndex === -1) {
          return res.status(404).json({ error: "Property not found" });
      }

      // Option 1: Complete removal - Remove the property from the array
      properties.splice(propertyIndex, 1);
      
      // Option 2 (Alternative): Hard delete by setting deleted flag
      // properties[propertyIndex].deleted = true;

      fs.writeFile(FILE_PATH, JSON.stringify(properties, null, 2), (err) => {
          if (err) {
              console.error("Error writing file:", err);
              return res.status(500).json({ error: "Error writing file" });
          }

          res.json({ 
              message: "Property permanently deleted", 
              deletedPropertyId: propertyId,
              properties: properties 
          });
      });
  });
});







// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    const user = await User.findById(decoded.userId);

    if (!user || user.status === 'Blocked') {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Admin Middleware
const adminAuth = async (req, res, next) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Admin access required' });
  }
};

// Register User
app.post('/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate role
    if (!['user', 'seller', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role selection' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register Admin (Secret endpoint - should be protected in production)
app.post('/auth/admin/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin already exists with this email' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if user is blocked
    if (user.status === 'Blocked') {
      return res.status(403).json({ message: 'Your account has been blocked' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create user object without sensitive information
    const userForToken = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    };

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' }
    );

    res.json({ token, user: userForToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Get user profile
app.get('/auth/profile', auth, async (req, res) => {
  try {
    // User is already attached by auth middleware
    const userProfile = {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      status: req.user.status
    };
    
    res.json(userProfile);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin Routes

// Get all properties
app.get('/admin/properties', auth, adminAuth, async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a property
app.delete('/admin/properties/:id', auth, adminAuth, async (req, res) => {
  try {
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: 'Property removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users
app.get('/admin/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Block a user
app.put('/admin/users/block/:id', auth, adminAuth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status: 'Blocked' },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a user
app.delete('/admin/users/:id', auth, adminAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a new property (admin only)
app.post('/admin/properties', auth, adminAuth, async (req, res) => {
  try {
    const { title, description, location, price, image } = req.body;
    
    const newProperty = new Property({
      title,
      description,
      location,
      price,
      image
    });
    
    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all properties (public route)
app.get('/properties', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Send a message
app.post('/messages', auth, async (req, res) => {
  try {
    const { receiver, message } = req.body;
    if (!receiver || !message) {
      return res.status(400).json({ message: 'Receiver and message are required' });
    }

    const newMessage = new Message({
      sender: req.user._id,
      receiver,
      message
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get messages between two users
app.get('/messages/:receiverId', auth, async (req, res) => {
  try {
    const receiverId = req.params.receiverId;
    
    const messages = await Message.find({
      $or: [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId, receiver: req.user._id }
      ]
    }).sort({ timestamp: 1 });

    res.json(Array.isArray(messages) ? messages : []); // Ensure response is always an array
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Get all users (excluding passwords)
app.get('/users', auth, async (req, res) => {
  try {
    const users = await User.find({}, '_id name email'); // Fetch only necessary fields
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Seller: Add Property



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));