const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
// const port = new SerialPort('/dev/cu.wchusbserial146230', { baudRate: 256000 })
const PouchDB = require("pouchdb");
const moment = require("moment");
const schedule = require("node-schedule");
const findArduino = require("./findArduino");

const run = async () => {
  const comName = await findArduino.find({
    initName: "blink-annoyer",
    searchCom: "144230"
  });
  const db = new PouchDB("http://piclox.larskarbo.no:5984/udos");
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
  const port = new SerialPort(comName, { lock: true });
  port.on("error", function(err) {
    console.log("Error: ", err.message);
  });
  port.on("open", function() {
    console.log("open");

    reset();
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

    var j = schedule.scheduleJob("0 0 18 * * *", function() {
      reset();
    });
  };
};

run();
