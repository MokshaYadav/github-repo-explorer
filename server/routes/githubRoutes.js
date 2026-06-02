const express = require("express");

const {
  getUserProfile,
  getUserRepos,
} = require("../controllers/githubController");

const router = express.Router();

router.get("/:username", getUserProfile);

router.get("/:username/repos", getUserRepos);

module.exports = router;