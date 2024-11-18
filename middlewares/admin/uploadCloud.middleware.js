const { uploadToCloudinary } = require("../../helpers/uploadToCloudinary"); 

module.exports.uploadSingle = async (req, res, next) => {
  try {
    
    const result = await uploadToCloudinary(req.file.buffer);4
    req.body[req.file.fieldname] = result
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
