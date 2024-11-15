const express = require("express");
const router = express.Router();
const multer  = require('multer')
const controller = require("../../controllers/admin/topic.controller");

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware")

router.get("/", controller.index);

router.get("/create", controller.create);

module.exports = router