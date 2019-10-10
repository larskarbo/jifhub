// just a handy server for testing
// can safely delete routes here

const server = require("server");
const delay = require("delay");
const fetch = require("node-fetch");
const qs = require("qs");

const { get, post } = server.router;
const { error } = server.router;
const { status, redirect } = server.reply;
// Launch the server to always answer "Hello world"

const port = 1234;
server({ port: port }, [
  get("/", async ctx => {
    if (ctx.query.error) {
      return redirect("http://localhost:3000?error=true");
    }

    const data = {
      grant_type: "authorization_code",
      code: ctx.query.code,
      redirect_uri: "http://localhost:1234/",
      client_id: "b351004d44404cf3ae9941d3e53fe840",
      client_secret: "dccbcf47bf944cadbad2e16daf630150"
    }
    console.log('data: ', data);
    const tokens = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: qs.stringify(data)
      }
    ).then(async a => {
      console.log('hey', a)
      return a.json()
    }).then(a => {

      console.log("a", a);
      return a;
    })

    // query = {
    //   client_id: "b351004d44404cf3ae9941d3e53fe840",
    //   response_type: "code",
    //   redirect_uri: "http://localhost:3000/"
    // };
    // console.log("redirurl: ", redirurl);
    // console.log("redirurl: ", redirurl.url);
    return redirect("http://localhost:3000/#access_token="+tokens.access_token);
  }),

  error(ctx => status(500).send(ctx.error.message))
]);

console.log("http://localhost:" + port + "/");
