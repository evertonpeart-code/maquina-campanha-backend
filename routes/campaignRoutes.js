const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController");

router.post("/generate", campaignController.generateCampaign);

module.exports = router;
