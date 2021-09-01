const express = require("express");
const router = express.Router();

const adminController = require("../Controllers/adminController");
const contactUs = require("../Controllers/contact_us.controller");

// ---------------------------------------------------------------------
// Stream Routes
// ---------------------------------------------------------------------
router.post("/contact_us", contactUs.contactController);
router.post("/payment", contactUs.paymentPaypalController);
router.get("/live-streams", adminController.getAllLiveStreams);
router.post("/search", adminController.homeSearch);

// ---------------------------------------------------------------------
// Movies Routes
// ---------------------------------------------------------------------
router.get("/movies", adminController.getAllMovies);

module.exports = router;
