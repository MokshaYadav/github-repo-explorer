# GitHub Repository Explorer

A full-stack GitHub Repository Explorer built using React and Express that allows users to search GitHub profiles, explore repositories, sort results, and view repository details.

## Features

### User Profile Search

* Search GitHub users by username
* View profile avatar, bio, followers, following, and repository count

### Repository Explorer

* Display repositories with:

  * Name
  * Description
  * Language
  * Stars
  * Last Updated Date
* Sort repositories by:

  * Stars
  * Name
  * Last Updated
* Expand repository cards for:

  * Open Issues
  * Fork Count
  * Watchers
  * Default Branch

### Additional Features

* Recently searched users (LocalStorage)
* Server-side caching using NodeCache (60s TTL)
* GitHub API rate limit handling
* Load More pagination
* Loading spinner UI
* Responsive dark-themed interface

---

## Tech Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* Node.js
* Express.js
* Axios
* NodeCache

---

## Project Structure

```text
github_repo_explorer
│
├── client
│   ├── src
│   ├── public
│   └── .env
│
├── server
│   ├── controllers
│   ├── routes
│   └── server.js
│
├── package.json
└── README.md
```

---

## Installation

Clone repository:

```bash
git clone https://github.com/MokshaYadav/github-repo-explorer
cd github_repo_explorer
```

Install dependencies:

```bash
npm run install:all
```

---

## Environment Variables

Create:

```text
client/.env
```

Add:

```env
VITE_API_URL=http://localhost:5000
```

---

## Run Project

Start backend:

```bash
npm run dev:server
```

Start frontend:

```bash
npm run dev:client
```

Backend:

```text
http://localhost:5000
```

Frontend:

```text
http://localhost:5173
```

---

## API Endpoints

### Get User Profile

```http
GET /api/github/:username
```

### Get User Repositories

```http
GET /api/github/:username/repos
```

---

## Caching

* User profiles cached for 60 seconds
* Repository results cached for 60 seconds
* Reduces repeated GitHub API calls

---

## Future Improvements

* Real pagination from GitHub API
* Language analytics charts
* Better skeleton loaders
* Unit testing

---

## Author

Moksha Yadav
