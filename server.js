const { createServer } = require('http');
const next = require('next');
const { createProxyMiddleware } = require('http-proxy-middleware');

// Next.js
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev, dir: './frontend' });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  // Express
  const backend = require('./backend/index');
  const port = 3000;

  // Next.js (https://nextjs.org/docs/pages/building-your-application/configuring/custom-server)
  const server = createServer((req, res) => {
    if (req.url.startsWith('/api')) {
      createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
      })(req, res);
    } else {
      handle(req, res);
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running on http://localhost:${port}`);
  });
});
