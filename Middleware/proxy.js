const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Enable CORS (if needed)
app.use(
  cors({
    origin: 'http://localhost:5039', // Allow the frontend to connect to this server
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: false,
    optionsSuccessStatus: 200,
  })
);

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://localhost:5005', // API server
    changeOrigin: true,
    secure: false,
    pathRewrite: { '^/api': '' },
    logLevel: 'debug',
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    },
  })
);


// Start the proxy server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
