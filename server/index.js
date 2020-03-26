const http = require("http");
const app = require("./app");
const server = http.createServer(app);

HTTP_PORT = process.env.PORT;

server.listen(HTTP_PORT, () => {
  console.log(`Server running on port ${HTTP_PORT}`);
});
