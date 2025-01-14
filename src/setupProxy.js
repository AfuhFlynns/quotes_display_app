const { createProxyMiddleware } = require("http-proxy-middleware");
const url = "https://zenquotes.io/api/quotes";
module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: `${url}`,
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/api" // rewrite path
      }
    })
  );
};
