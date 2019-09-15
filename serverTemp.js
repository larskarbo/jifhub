const server = require("server");

// Launch the server to always answer "Hello world"
server(ctx => {
  console.log("here we  go")
  return 'Hello world!'
});

console.log("http://localhost:3000/")