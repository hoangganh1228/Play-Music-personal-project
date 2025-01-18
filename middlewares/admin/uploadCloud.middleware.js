const { uploadToCloudinary } = require("../../helpers/uploadToCloudinary"); 
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')  
module.exports.uploadSingle = async (req, res, next) => {
  // if (!req.file) {
  //   console.error("No file received");
  //   return res.status(400).json({ error: "No file uploaded" });
  // }

  try {
    const result = await uploadToCloudinary(req.file.buffer);
    req.body[req.file.fieldname] = result;
  } catch (error) {
    console.error("Error uploading single file:", error);
  }

  next();
}

module.exports.uploadFields = async (req, res, next) => {
  for (const key in req.files) {
    req.body[key] = [];
    const array = req.files[key]; 

    for (const item of array) {
      try {
        const result = await uploadToCloudinary(item.buffer);
        req.body[key] = result; 
      } catch (error) {
        console.error(`Error uploading file in field ${key}:`, error);
      }
    }
  }
  next(); 
};

const streamUpload = (file) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

module.exports.uploadMultiple = async (req, res, next) => {
  if (req.files && req.files.length > 0) { // Kiểm tra xem có tệp nào không
    try {
      const uploadPromises = req.files.map(file => streamUpload(file));

      const results = await Promise.all(uploadPromises);

      req.body.images = results.map(result => result.secure_url);

      next(); // Chuyển đến middleware hoặc route handler tiếp theo
    } catch (error) {
      console.error('Lỗi khi tải lên nhiều ảnh:', error);
      res.status(500).json({ error: 'Tải lên ảnh thất bại' });
    }
  } else {
    next(); // Không có tệp nào, tiếp tục xử lý tiếp theo
  }

}