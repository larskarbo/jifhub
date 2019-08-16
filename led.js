const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
// const port = new SerialPort('/dev/cu.wchusbserial146230', { baudRate: 256000 })
const PouchDB = require("pouchdb");
const moment = require("moment");
const schedule = require("node-schedule");
const findArduino = require("./findArduino");

const PouchdbFind = require( "pouchdb-find")
PouchDB.plugin(PouchdbFind);

const utils = require("udos-utils")

const run = async () => {
  // await new Promise(resolve => setTimeout(resolve, 10000));
  
  const comName = await findArduino({
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
      should3BeOn()
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

  const should3BeOn = async () => {
    return
    const reviews = (await db.find({
      limit: 9000,
      selector: {
        type: "review"
      }
    })).docs

    const tasks = (await (db.find({
      limit: 9000,
      selector: {
        type: "task"
      }
    }))).docs

    const realTasks = tasks.filter(t => t.tag == "📚")
    const reviewsToday = utils.reviewsToday(reviews, tasks)

    console.log("reviewsToday: ", reviewsToday);
    // if (reviewsToday < 10) {
      // port.write("3on\n");
    // } else {
      port.write("3off\n");

    // }
  
  };


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

        setTimeout(() => {
          should3BeOn();
        }, 1000);
      }, 1000);
    }, 2000);

    var j = schedule.scheduleJob("0 0 18 * * *", function() {
      reset();
    });
  };
};

run();
