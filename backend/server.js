const http = require('http');
const app = require('./app');
const Obserser = require('./services/Observer');
const port = process.env.PORT || 3003;
const server = http.createServer(app);



var obserser = new Obserser();
//give path of file wherre your transaction data is being stored from the walletnotifu script
const file = "C:\\demo\\output.txt";

obserser.on('file-updated', log => {
  //console.log(log.message);
  console.log("updated");

});

obserser.watchFile(file);


server.listen(port);