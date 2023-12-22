const {createProxyMiddleware} = require("http-proxy-middleware");

const requestUrl = 'http://172.27.106.36:4000'

const apiProxy = createProxyMiddleware("/api", {
    target: requestUrl,
    changeOrigin: true,
    // pathRewrite: {'^': ''},
});
module.exports = function (app) {
    app.use(apiProxy);
}
