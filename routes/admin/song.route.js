const express = require("express");
const router = express.Router();
const multer  = require('multer')
const controller = require("../../controllers/admin/song.controller");

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create", 
  upload.fields(
    [
      { name: 'avatar', maxCount: 1 },
      { name: 'audio', maxCount: 1 }
    ]
  ),
  uploadCloud.uploadFields,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id", 
  upload.fields(
    [
      { name: 'avatar', maxCount: 1 },
      { name: 'audio', maxCount: 1 }
    ]
  ),
  uploadCloud.uploadFields,
  controller.editPatch
);

router.delete("/delete/:id", controller.delete);


module.exports = router