require("dotenv").config({ 
  path:"config/config.env"
})
const cloudinary = require("cloudinary");
const mongoose = require('mongoose');
const connectDatabase = require('./Database/db');

const app = require('./app');
const port = process.env.PORT || 4000;

connectDatabase()
   

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,  
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

