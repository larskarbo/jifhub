const server = require("server");
const delay = require("delay");

const { get, post } = server.router;
const { error } = server.router;
const { status } = server.reply;
// Launch the server to always answer "Hello world"

let listeners = [];
let listenersV2 = [];

server({ port: 1225 }, [
  get("/", async ctx => {
    console.log("here we  go");
    const prm = new Promise((resolve, reject) => {
      const something = direction => {
        resolve(direction);
      };
      listeners.push(something);
    });

    const prm2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("nothing");
      }, 50000);
    });

    return await Promise.race([prm, prm2]);
  }),
  get("/steer/:direction", async ctx => {
    console.log(ctx.params.direction);
    listeners.forEach(l => l(ctx.params.direction));
    return "hey!";
  }),
  get("/longpollstatus/:id", async ctx => {
    console.log(ctx.params.id);
    const prm = new Promise((resolve, reject) => {
      const something = value => {
        resolve(value);
      };
      //nb dinne linja ↓ gjer at kun en request kan listene på samme id
      listenersV2 = listenersV2.filter(l => l.id != ctx.params.id)
      
      listenersV2.push({
        id: ctx.params.id,
        fn: something
      });
    });

    const prm2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("nothing");
      }, 50000);
    });

    return await Promise.race([prm, prm2]);
  }),

  get("/statusnotify/:id/:value", async ctx => {
    console.log(ctx.params.value);
    console.log('listenersV2: ', listenersV2);
    listenersV2
      .filter(l => l.id == ctx.params.id)
      .forEach(l => {
        console.log('larskarbo@hotmail.com:',l)
        l.fn(ctx.params.value)
      });
    return "hey!";
  }),
  error(ctx => status(500).send(ctx.error.message))
]);

console.log("http://localhost:1225/");
