const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");
// const port = new SerialPort('/dev/cu.wchusbserial146230', { baudRate: 256000 })
const moment = require("moment");
const schedule = require("node-schedule");
const findArduino = require("./findArduino");
var Parse = require("parse/node");

// Parse.initialize("udos");
// Parse.serverURL = "http://localhost:1337/parse";
Parse.initialize(
  "gRVOPbmAuYHBC3ZK4nvA8tA85OEN3doQEMQdrV3E",
  "8FM6i2wIELZSold0C7fCELVWNQd3LI5UQrMzEE85"
);
Parse.serverURL = 'https://pg-app-3mjkbjxesqq7ejfiys8ahzyqiycdhc.scalabl.cloud/1/';


const utils = require("udos-utils");
let port = null
var j = schedule.scheduleJob("0 0 18 * * *", function() {
  reset(port);
});

reset = port => {
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
        // should3BeOn();
      }, 1000);
    }, 1000);
  }, 2000);

};

const run = async () => {
  let query = new Parse.Query("Review");
  query.equalTo("taskId", "6b22eb6f2dbb49baaeff148bd615141d");
  
  // let res = await query.find();
  // console.log('res: ', res);
  // return
  let subscription = await query.subscribe();
  subscription.on('create', (people) => {
    // console.log('people: ', people);
    console.log('yes!!!!!')
    port.write("2off\n");
  });
  
  
  const comName = await findArduino({
    initName: "blink-annoyer",
    searchCom: "144230"
  });
  
  port = new SerialPort(comName, { lock: true });
  port.on("error", function(err) {
    console.log("Error: ", err.message);
  });
  port.on("open", function() {
    console.log("open");

    reset(port);
  });

  // const should3BeOn = async () => {
  //   return;
  //   const reviews = (await db.find({
  //     limit: 9000,
  //     selector: {
  //       type: "review"
  //     }
  //   })).docs;

  //   const tasks = (await db.find({
  //     limit: 9000,
  //     selector: {
  //       type: "task"
  //     }
  //   })).docs;

  //   const realTasks = tasks.filter(t => t.tag == "📚");
  //   const reviewsToday = utils.reviewsToday(reviews, tasks);

  //   console.log("reviewsToday: ", reviewsToday);
  //   // if (reviewsToday < 10) {
  //   // port.write("3on\n");
  //   // } else {
  //   port.write("3off\n");

  //   // }
  // };

  
};

run();
