const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/videoController");

// POST route for processing media
router.post("/process", mediaController.processMedia);

module.exports = router;
