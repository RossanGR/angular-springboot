const PROXY_CONFIG = [
  {
  context: '/api',
  target: 'http://localhost:5000/',
  secure: false,
  loglevel: 'debug'
  }
];

module.exports = PROXY_CONFIG;
