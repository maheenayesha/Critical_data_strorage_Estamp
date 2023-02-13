const chokidar = require('chokidar');
const EventEmitter = require('events').EventEmitter;
const readLastLines = require('read-last-lines');
const Fir = require("../api/controllers/firs");
const statusFilePath = "C:\\demo\\transaction_status.txt";
class Observer extends EventEmitter {
  attemp = 0;
  previous_stream_items = [];
  new_stream_items = [];
  constructor() {
    super();
  }

   comparer(otherArray){
    return function(current){
      return otherArray.filter(function(other){
        return other.txid == current.txid;
      }).length == 0;
    };
  }

  watchFile(targetFile) {
    try {
      console.log(
        `[${new Date().toLocaleString()}] Watching for file changes on: ${targetFile}`
      );

      var watcher = chokidar.watch(targetFile, { persistent: true,   awaitWriteFinish: {
        stabilityThreshold: 2000,
        pollInterval: 10000
      } 
    });

      watcher.on('change', async filePath => {
        console.log(
          `[${new Date().toLocaleString()}] ${filePath} has been updated.`
        );
        // Get update content of file, in this case is one line
        var updateContent = await readLastLines.read(filePath);
        //var transaction_status = (await readLastLines.read(statusFilePath));

        // emit an event when the file has been updated
        this.emit('file-updated', { message: updateContent });
        try {
          let input_var = JSON.parse(updateContent);
          if (input_var != null && input_var != undefined ) {
            this.attemp==0;
            if (this.attemp == 0) {
              this.previous_stream_items.push(input_var[input_var.length-1]);
              this.new_stream_items = this.previous_stream_items;
            }
            else {
              let compA=this.comparer(input_var);
              let compB=this.comparer(this.previous_stream_items);
              var onlyInA = this.previous_stream_items.filter(this.comparer(input_var));
              var onlyInB = input_var.filter(this.comparer(this.previous_stream_items));
              
              this.new_stream_items = onlyInB;


              // let last_ind=this.previous_stream_items.length-1;
              // let last_txid=this.previous_stream_items[9].txid;
              // let last_id=input_var.findIndex(x=> x.txid==last_txid);
              // this.new_stream_items = input_var.slice(last_id+1,input_var.length)
              //this.previous_stream_items = input_var;
              console.log(this.new_stream_items);
              this.previous_stream_items = input_var;
            }
            let i = 0;
            this.new_stream_items.forEach(x => {
              let operationType = x.data.json.OperationType;

              if (operationType == 1) { // create=1, update/approve=2
                Fir.fir_store_create_transaction_in_db(x,i);
              }
              else if (operationType == 2) {
                Fir.fir_store_update_transaction(x,i);
              }
              i = i + 1;
            });

            this.attemp += 1;
          }

        }
        catch {
          console.log("error in saving to db");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Observer;