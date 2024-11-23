const express = require("express");
const router = express.Router();
const multer  = require('multer')
const controller = require("../../controllers/admin/role.controller");

const upload = multer();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

router.get("/", controller.index);

router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.get("/edit/:id", controller.edit);

router.patch("/edit/:id", controller.editPatch);

router.delete("/delete/:id", controller.delete);

router.get("/permissions", controller.permissions);

router.patch("/permissions", controller.permissionsPatch);


module.exports = router