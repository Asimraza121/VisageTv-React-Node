const express = require("express");
const router = express.Router();

const adminController = require("../Controllers/adminController");

const { auth } = require("../Middlewares/auth");

const { Pictures } = require("../Utils/Uploads");

// ---------------------------------------------------------------------
// Auth Routes
// ---------------------------------------------------------------------
router.post("/log-in", adminController.logInUser);
router.post("/create/user", adminController.createUser);

router.get("/me", auth, adminController.getCurrentUser);

// ---------------------------------------------------------------------
// Stream Routes
// ---------------------------------------------------------------------
router.post(
  "/live-stream",
  auth,
  Pictures.single("thumbnail"),
  adminController.addLiveStream
);

router.delete("/live-stream/:id", auth, adminController.deleteLiveStream);

router.put(
  "/live-stream/:id",
  auth,
  Pictures.single("thumbnail"),
  adminController.updateLiveStream
);

// ---------------------------------------------------------------------
// Movies Routes
// ---------------------------------------------------------------------
router.post(
  "/movie",
  auth,
  Pictures.single("thumbnail"),
  adminController.addMovie
);

router.delete("/movie/:id", auth, adminController.deleteMovie);

router.put(
  "/movie/:id",
  auth,
  Pictures.single("thumbnail"),
  adminController.updateMovie
);

module.exports = router;
