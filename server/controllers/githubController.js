const axios = require("axios");
const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 60,
});

exports.getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const cachedUser = cache.get(`user-${username}`);

    if (cachedUser) {
      return res.json(cachedUser);
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );

    cache.set(`user-${username}`, response.data);

    res.json(response.data);

  } catch (error) {

    if (error.response?.status === 404) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (error.response?.status === 403) {
      return res.status(403).json({
        message: "GitHub rate limit reached",
      });
    }

    res.status(500).json({
      message: "Server Error",
    });
  }
};

exports.getUserRepos = async (req, res) => {
  try {
    const { username } = req.params;

    const cachedRepos = cache.get(`repos-${username}`);

    if (cachedRepos) {
      return res.json(cachedRepos);
    }

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );

    cache.set(`repos-${username}`, response.data);

    res.json(response.data);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching repos",
    });

  }
};