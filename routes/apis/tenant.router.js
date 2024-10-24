const express = require("express");
const router = express.Router();
const TetantController = require("../../controller/tenant.controller");
const validateToken = require("../../config/helper");


router.post("/add",TetantController.create);

module.exports = router;
