const express = require('express');
const http = require('http');

const app = express();
app.use(cors());

const server = http.createServer(app);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
