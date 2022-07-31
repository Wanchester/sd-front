const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const PROD_API_URL = 'http://54.210.74.109/api';
const EXPRESS_PORT = 5000;

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