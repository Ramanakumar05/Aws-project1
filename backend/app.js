const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const imageRoutes=require('./routes/images')
const cors=require('cors')
require('dotenv').config();



const app = express();
app.use(express.json());
app.use(cors())

app.use

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/images', imageRoutes); // ✅ protected upload/gallery


app.listen(3000, () => console.log('Server running on port 3000'));
