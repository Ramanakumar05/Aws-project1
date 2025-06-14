const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const AWS = require('aws-sdk');
const Image = require('../models/images');  // ✅ FIXED
const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

const router = express.Router();

// Auto-create uploads folder
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}


// Multer
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDir);
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname); // safer
  }
});
const upload = multer({ storage });

// aws
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const s3 = new AWS.S3();


router.get('/gallery', authMiddleware, async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.userId }).sort({ uploadedAt: -1 });
    res.json({ images: images.map(img => img.url) });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load gallery' });
  }
});


router.post('/upload', authMiddleware, upload.single('image'), async (req, res) => {
  const fileContent = fs.readFileSync(req.file.path);
  const S3Params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: req.file.filename,
    Body: fileContent,
    ContentType: req.file.mimetype
  };

  s3.upload(S3Params, async (error, data) => {
    if (error) {
      console.log("S3 Upload Error", error);
      return res.status(500).json({ error: 'Upload to S3 failed' });
    }
    // Mongodb metadata upload
    try {
      const newImage = new Image({
        url: data.Location,
        user: req.user.userId
      });
      await newImage.save();
      res.json({ imageUrl: data.Location });
    } catch (err) {
      res.status(500).json({ error: 'Failed to save image to DB' });
    }
  });
});


module.exports=router
