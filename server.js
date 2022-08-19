const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const DEV_REACT_URL = 'http://localhost:3000';
const PROD_API_URL = 'http://54.210.74.109/api';
const EXPRESS_PORT = 5047;

const app = express();

app.use(cors());

app.use('/api', createProxyMiddleware({
  target: PROD_API_URL,
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    Object.keys(proxyRes.headers).forEach(function (key) {
      res.append(key, proxyRes.headers[key]);
    });
  },
  onProxyReq: function (proxyReq, req) {
    Object.keys(req.headers).forEach(function (key) {
      proxyReq.setHeader(key, req.headers[key]);
    });
  },
  prependPath: false
}));

app.use('*', createProxyMiddleware({
  target: DEV_REACT_URL,
  changeOrigin: true
}));

app.listen(EXPRESS_PORT, () => {
  console.log(`Proxy server has started on port ${EXPRESS_PORT}`);
});