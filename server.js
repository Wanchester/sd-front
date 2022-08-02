const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PROD_API_URL = 'http://54.210.74.109/api';
<<<<<<< HEAD
const EXPRESS_PORT = 5047;
=======
const EXPRESS_PORT = 5000;
>>>>>>> f96e761a243e9d5550684b9df86dd975361bb23d

const app = express();

app.use(cors());

app.use('/api', createProxyMiddleware({
  target: PROD_API_URL,
  changeOrigin: true,
  onProxyRes: function (proxyRes) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  },
  prependPath: false
}));

app.listen(EXPRESS_PORT, () => {
  console.log(`Proxy server has started on port ${EXPRESS_PORT}`);
});