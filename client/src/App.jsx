
import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUser = async () => {
    if (!username) return;

    try {
      setLoading(true);
      setError("");

      const profileRes = await axios.get(
        `http://localhost:5000/api/github/${username}`
      );

      const repoRes = await axios.get(
        `http://localhost:5000/api/github/${username}/repos`
      );

      setProfile(profileRes.data);
      setRepos(repoRes.data);

    } catch (err) {

      setError(
        err.response?.data?.message || "Something went wrong"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="container">

      <h1>GitHub Repo Explorer</h1>

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <button onClick={searchUser}>
          Search
        </button>

      </div>

      {loading && (
        <p className="loading">
          Loading...
        </p>
      )}

      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {profile && (

        <div className="profile-card">

          <img
            src={profile.avatar_url}
            alt="avatar"
          />

          <h2>{profile.name}</h2>

          <p>@{profile.login}</p>

          <p>
            Followers: {profile.followers}
          </p>

          <p>
            Public Repos: {profile.public_repos}
          </p>

        </div>

      )}

      <div className="repo-grid">

        {repos.map((repo) => (

          <div
            className="repo-card"
            key={repo.id}
          >

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >

              <h3>{repo.name}</h3>

            </a>

            <p>
              {repo.description || "No description available"}
            </p>

            <p>
              ⭐ {repo.stargazers_count}
            </p>

            <p>
              {repo.language || "Unknown"}
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;