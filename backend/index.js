const express = require('express');

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
