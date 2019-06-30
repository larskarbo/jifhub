const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
// const port = new SerialPort('/dev/cu.wchusbserial146230', { baudRate: 256000 })

function getConnectedArduino() {
  SerialPort.list(function(err, ports) {
    var allports = ports.length;
    var count = 0;
    var done = false
    ports.forEach(function(port) {
      count += 1;
      pm = port['manufacturer'];
      console.log(port);
      // if (typeof pm !== 'undefined' && pm.includes('arduino')) {
      //   arduinoport = port.comName.toString();
      //   var serialPort = require('serialport');
      //   sp = new serialPort(arduinoport, {
      //     buadRate: 9600
      //   })
      //   sp.on('open', function() {
      //     console.log('done! arduino is now connected at port: ' + arduinoport)
      //   })
      //   done = true;
      // }
      // if (count === allports && done === false) {
      //    console.log('cant find arduino')
      // }
    });

  });
}

getConnectedArduino()
  
// (() => {
//   const port = new SerialPort('/dev/tty.wchusbserial146230', { autoOpen: false })

//   port.open(function (err) {
//     if (err) {
//       return console.log('Error ved åpning av port: ', err.message);
//     }
//   });
  
//   // Open errors will be emitted as an error event
//   port.on('error', function(err) {
//     console.log('Error: ', err.message)
//   })
  
//   // The open event is always emitted
//   port.on('open', function() {
//     console.log('open')
//   })
  
  
//   // // Switches the port into "flowing mode"
//   // port.on('data', function (data) {
//   //   console.log('Data:', data)
//   // })
  
//   port.on('readable', function () {
//     console.log('Data:', port.read().toString())
//   })
  
  
// })