const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')  
require("dotenv").config();

// cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});
// End cloudinary

const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    streamifier.createReadStream(buffer).pipe(stream);
  })
}

 const uploadToCloudinary = async (buffer) => {
  let result = await streamUpload(buffer);
  return result.url
}

module.exports = { uploadToCloudinary }