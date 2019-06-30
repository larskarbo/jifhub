const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
// const port = new SerialPort('/dev/cu.wchusbserial146230', { baudRate: 256000 })
const PouchDB = require("pouchdb")

const getPort = () =>
  new Promise(function(resolve, reject) {
    SerialPort.list(function(err, ports) {
      const candidates = ports.filter(port => port.productId == "7523");

      if (candidates.length === 0) {
        console.log("Couldn't find port");
        console.log("available ports: ", ports);
        reject("Couldn't find port");
      } else if (candidates.length == 1) {
        resolve(candidates[0].comName);
      } else {
        console.log("candidates: ", candidates);
        console.log("too many candidates! taking first");
        resolve(candidates[0].comName);
      }
    });
  });

const run = async () => {
  const comName = await getPort();
  const db =  new PouchDB('http://157.230.25.171:5984/reviews');
  const port = new SerialPort(comName);
  port.on("error", function(err) {
    console.log("Error: ", err.message);
  });
  port.on("open", function() {
    console.log("open");
  });
  port.on("readable", function() {
    const data = port.read().toString()
    console.log('data: ', data);

    if (data.includes("jiffen er on")) {
      db.post({
        type: 'jifsprut',
        timestamp: new Date()
      }).then(function (doc) {
        console.log(doc);
      }).catch(err => {
        console.log('err: ', err);

      })
    }
  });

};

run();
// (() => {

//   // Open errors will be emitted as an error event

//   // The open event is always emitted

//   // // Switches the port into "flowing mode"
//   // port.on('data', function (data) {
//   //   console.log('Data:', data)
//   // })

// })
