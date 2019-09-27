const server = require("server");
const delay = require("delay")

const { get, post } = server.router;
// Launch the server to always answer "Hello world"

let listeners = []

server({ port: 1225 }, [
  get('/', async ctx => {
    console.log("here we  go")
    const prm = new Promise((resolve, reject) => {
      const something = (direction) => {
        resolve(direction)
      }
      listeners.push(something)
    })

    const prm2 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('nothing')
      }, 50000)
    })

    
    return await Promise.race([prm, prm2])
  }),
  get('/steer/:direction', async ctx => {
    console.log(ctx.params.direction)
    listeners.forEach(l => l(ctx.params.direction))
    return 'hey!'
  }),
]);

console.log("http://localhost:1225/")