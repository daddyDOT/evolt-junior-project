
<h1 align="center" style="font-weight: bold;">Chatter.app</h1>

<p align="center">
<a href="#tech">Technologies</a>
<a href="#started">Getting Started</a>
<a href="#routes">API Endpoints</a>
<a href="#routes">Useful</a>
 
</p>


<p align="center">Simple chatting application</p>



<h2 id="technologies">💻 Tools / Technologies</h2>

| Tool / Technology | Description | Source |
|---|---|---|
| Express  | Backend | [Express](https://expressjs.com/) |  
| Next.js 14  |  Frontend | [Next.js](https://nextjs.org/) |
| Socket.io  |  Low-latency communication tool | [Socket.io](https://socket.io/)  |
| MongoDB  |  Database for storing messages | [MongoDB](https://www.mongodb.com/)  |
| Next UI  |  Used to style a big part of the application  | [NextUI](https://nextui.org/)  |
| Tailwind CSS |  Used as a CSS framework | [Tailwind CSS](https://tailwindcss.com/)  |
| Docker |  Used to dockerize the application using a single compose file | [Docker](https://www.docker.com/)  |

<h2 id="started">🚀 Getting started</h2>

This documentation contains the process of building and running the app using **Docker**.
If you want to manually start frontend and backend, please visit /frontend and /backend directories.

<h3>Cloning</h3>

```bash
git clone https://github.com/daddyDOT/evolt-junior-project.git
```

<h3>Config .env variables</h2>

Use the `.env.example` as reference to create your configuration file `.env` with your MongoDB Credentials

```yaml
MONGODB_URI="mongodb+srv://username:password@cluster..."
CLIENT_URL="http://frontend:3000"
```

Environment variables for frontend are located in `./frontend/next.config.mjs`

<h3>Install express locally in /backend</h2>

Since this docker build requires express to be installed locally first, do:

```yaml
cd backend/
npm install express --save
```

<h3>Starting</h3>

```bash
cd evolt-junior-project
docker compose build
docker compose up
```

<h2 id="routes">📍 API Endpoints</h2>
​

| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /messages</kbd>     | retrieves messages from database |


<h3>Documentations that helped</h3>

[📝 Socket.io + Next.js](https://socket.io/how-to/use-with-nextjs)

[💾 Socket.io + Express](https://socket.io/how-to/use-with-express-session)
