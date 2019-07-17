const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
// const port = new SerialPort('/dev/cu.wchusbserial146230', { baudRate: 256000 })
const PouchDB = require("pouchdb");
const moment = require("moment")
const schedule = require("node-schedule")

const getPort = () =>
  new Promise(function(resolve, reject) {
    SerialPort.list(function(err, ports) {
      const candidates = ports.filter(port => port.productId == "7523");
      console.log('candidates: ', candidates);
      return
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
  const db = new PouchDB("http://104.248.32.243:5984/udos");
  const port = new SerialPort(comName);
  db.changes({
    since: "now",
    live: true,
    include_docs: true
  })
    .on("change", function(change) {
      console.log("change: ", change);
      // received a change
      if (change.doc.taskId == "6b22eb6f2dbb49baaeff148bd615141d") {
        // jif!!!
          port.write("2off\n");
      }
    })
    .on("error", function(err) {
      console.log("err: ", err);
      // handle errors
    });
  port.on("error", function(err) {
    console.log("Error: ", err.message);
  });
  port.on("open", function() {
    console.log("open");

    reset()
  });
  port.on("readable", function() {
    const data = port.read().toString();
    console.log("data: ", data);

    if (data.includes("jiffen er on")) {
      db.post({
        type: "review",
        taskId: "6b22eb6f2dbb49baaeff148bd615141d",
        timestamp: new Date()
      })
        .then(function(doc) {
          console.log(doc);
        })
        .catch(err => {
          console.log("err: ", err);
        });
    }
  });


  const reset = () => {
    setTimeout(() => {
      port.write("2on\n");
      setTimeout(() => {
        port.write("3on\n");
      }, 100);
      setTimeout(() => {
        port.write("4on\n");
      }, 200);
      setTimeout(() => {
        port.write("5on\n");
      }, 300);
      setTimeout(() => {
        port.write("2off\n");
        setTimeout(() => {
          port.write("3off\n");
        }, 100);
        setTimeout(() => {
          port.write("4off\n");
        }, 200);
        setTimeout(() => {
          port.write("5off\n");
        }, 300);

        setTimeout(() => {
          port.write("2on\n");
        }, 1000);
      }, 1000);
    }, 2000);

    var j = schedule.scheduleJob('0 0 18 * * *', function(){
      reset()
    });
  }
};

run();
