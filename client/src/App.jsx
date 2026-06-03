import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sortType, setSortType] = useState("stars");

  const searchUser = async () => {

    if (!username.trim()) return;

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
        err.response?.data?.message ||
        "Something went wrong"
      );

      setProfile(null);
      setRepos([]);

    } finally {

      setLoading(false);

    }

  };

  const sortedRepos = [...repos].sort((a,b)=>{

    if(sortType==="stars"){

      return (
        b.stargazers_count -
        a.stargazers_count
      );

    }

    if(sortType==="name"){

      return a.name.localeCompare(
        b.name
      );

    }

    if(sortType==="updated"){

      return (
        new Date(b.updated_at) -
        new Date(a.updated_at)
      );

    }

    return 0;

  });

  return (

    <div className="container">

      <h1>
        GitHub Repository Explorer
      </h1>

      <div className="search-box">

        <input
          type="text"
          placeholder="Enter GitHub Username"
          value={username}
          onChange={(e)=>
            setUsername(e.target.value)
          }
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
            alt="profile"
          />

          <h2>

            {profile.name ||
             profile.login}

          </h2>

          <p>

            @{profile.login}

          </p>

          <p>

            {
              profile.bio ||
              "No bio available"
            }

          </p>

          <p>

            Followers:
            {" "}
            {profile.followers}

          </p>

          <p>

            Following:
            {" "}
            {profile.following}

          </p>

          <p>

            Public Repositories:
            {" "}
            {profile.public_repos}

          </p>

        </div>

      )}

      {repos.length > 0 && (

        <div className="sort-box">

          <label>
            Sort Repositories
          </label>

          <select
            value={sortType}
            onChange={(e)=>
              setSortType(
                e.target.value
              )
            }
          >

            <option value="stars">
              Sort by Stars
            </option>

            <option value="name">
              Sort by Name
            </option>

            <option value="updated">
              Sort by Updated
            </option>

          </select>

        </div>

      )}

      <div className="repo-grid">

        {sortedRepos.map((repo)=>(

          <div
            className="repo-card"
            key={repo.id}
          >

            <a
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
            >

              <h3>

                {repo.name}

              </h3>

            </a>

            <p>

              {
                repo.description ||
                "No description available"
              }

            </p>

            <p>

              ⭐ {repo.stargazers_count}

            </p>

            <p>

              Language:
              {" "}
              {
                repo.language ||
                "Unknown"
              }

            </p>

            <p>

              Updated:
              {" "}

              {

              new Date(
                repo.updated_at
              )

              .toLocaleDateString()

              }

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}

export default App;