
import { useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {

  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sortType, setSortType] =
    useState("stars");

  const [expandedRepo, setExpandedRepo] =
    useState(null);

  const [visibleRepos, setVisibleRepos] =
    useState(6);

  const [recentUsers, setRecentUsers] =
    useState(() => {

      return JSON.parse(

        localStorage.getItem(
          "recentUsers"
        )

      ) || [];

    });

  const saveRecentUser = (user) => {

    let updatedUsers = [

      user,

      ...recentUsers.filter(
        (u) => u !== user
      )

    ];

    updatedUsers =
      updatedUsers.slice(0,5);

    setRecentUsers(updatedUsers);

    localStorage.setItem(

      "recentUsers",

      JSON.stringify(
        updatedUsers
      )

    );

  };

  const searchUser = async (
    customUser = username
  ) => {

    if (!customUser.trim()) return;

    try {

      setLoading(true);

      setError("");

      setVisibleRepos(6);

      const profileRes =
        await axios.get(

`${API_URL}/api/github/${customUser}`

        );

      const repoRes =
        await axios.get(

`${API_URL}/api/github/${customUser}/repos`

        );

      setProfile(
        profileRes.data
      );

      setRepos(
        repoRes.data
      );

      saveRecentUser(
        customUser
      );

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

  const sortedRepos =
    [...repos].sort((a,b)=>{

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

          new Date(
            b.updated_at
          ) -

          new Date(
            a.updated_at
          )

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

setUsername(
e.target.value
)

}

/>

<button
onClick={()=>
searchUser()
}
>

Search

</button>

</div>

{recentUsers.length > 0 && (

<div className="recent-box">

<p>

Recent Searches

</p>

<div className="recent-list">

{recentUsers.map((user)=>(

<button

key={user}

className="recent-btn"

onClick={()=>{

setUsername(user);

searchUser(user);

}}

>

{user}

</button>

))}

</div>

</div>

)}

{loading && (

<div className="loading-container">

<div className="spinner"></div>

<p>

Fetching GitHub Data...

</p>

</div>

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

Repositories:

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

{

sortedRepos

.slice(0, visibleRepos)

.map((repo)=>(

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

<button

className="details-btn"

onClick={()=>{

setExpandedRepo(

expandedRepo===repo.id

? null

: repo.id

)

}}

>

{

expandedRepo===repo.id

? "Hide Details"

: "Show Details"

}

</button>

{

expandedRepo===repo.id && (

<div className="repo-extra">

<p>

Open Issues:

{repo.open_issues_count}

</p>

<p>

Default Branch:

{repo.default_branch}

</p>

<p>

Forks:

{repo.forks_count}

</p>

<p>

Watchers:

{repo.watchers_count}

</p>

</div>

)

}

</div>

))

}

</div>

{

visibleRepos < sortedRepos.length && (

<button

className="load-more-btn"

onClick={()=>{

setVisibleRepos(

prev => prev + 6

)

}}

>

Load More Repositories

</button>

)

}

</div>

  );

}

export default App;