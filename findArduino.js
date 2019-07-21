const SerialPort = require("serialport");
const Readline = require("@serialport/parser-readline");

const find = opts => {
  const defaults = {
    initName: null,
    productId: "7523",
    searchCom: "",
  };
  const options = {
    ...defaults,
    ...opts
  };
  if (!options.initName) {
    throw "please specify initName";
  }
  if (!options.productId) {
    throw "please specify productId";
  }
  return new Promise(function(resolve, reject) {
    SerialPort.list(function(err, ports) {
      const candidates = ports.filter(port => {
        return port.productId == options.productId && port.comName.includes(options.searchCom);
      });

      console.log("candidates: ", candidates);

      const promisesList = candidates.map(candidate => {
        return new Promise((resolve, reject) => {
          console.log("trying first", candidate.comName);
          const port = new SerialPort(candidate.comName, {
            lock: true
          });
          port.on("open", function() {
            console.log("open", candidate.comName);
          });
          port.on("readable", function() {
            const data = port.read().toString();
            if (data.includes("init:")) {
              const id = data.replace("init:", "").trim();
              console.log("id: ", id);

              port.close(() => {
                if (id == options.initName) {
                  resolve(candidate.comName);
                } else {
                  reject("yeah");
                }
              });
            }
            // console.log("data: ", data);
          });
        }).catch(err => {
          console.log("lol", err);
        });
      });

      console.log("promisesList: ", promisesList);
      Promise.race(promisesList)
        .then(a => {
          console.log("a", a);
          resolve(a)
        })
        .catch(() => {
          console.log("asdf");
        });
    });
  });
};

module.exports = find;
