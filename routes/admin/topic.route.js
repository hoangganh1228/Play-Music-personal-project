const express = require("express");
const router = express.Router();
const multer  = require('multer')
const controller = require("../../controllers/admin/topic.controller");

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get("/", controller.index);

router.get("/create", controller.create);

router.post(
  "/create", 
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id", 
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  controller.editPatch
);

router.delete("/delete/:id", controller.delete);


module.exports = router