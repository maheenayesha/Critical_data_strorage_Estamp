const Multichain = require('./multichain-utils');


let multichainobj = require("multichain-node")({
    //  port: process.env.port,
    //  host: process.env.host,
    //  user: process.env.user,
    //  pass: process.env.pass
    port: "7414",
    host: "127.0.0.1",
    user: "multichainrpc",
    pass: "CwrUD22bCueovu6dox8Et7y5rupnEEhjrqHG7e8cMYZ3"
    //  headers: {
    //      'Content-Type': 'application/json'
    //  }
});
exports.multichain_get_all = async (req, res, next) => {
    try {
        let obj = await Multichain.multichain_get_all_stream_items();
        console.log(obj);
        if (obj.status == -1) {
            return res.status(500).json({
                error: obj.err
            });
        }

        return res.status(200).json({
            result: obj.result,
            message: "success"
        });
    } catch (err) {
        return res.status(500).json({
            error: err,
            msg: "exception"
        });
    }

};
exports.multichain_publish_item = async (req, res, next) => {

    let temp = {
        json: {
            "PersonName": "testing",
            "PersonCnic": "3310062212345",
            "IncidentLocation": "St # 02 Model Town house 332",
            "CrimeType": "Violence",
            "District": "Punjab",
            "PoliceStationAddress": "Model Town",
            "CaseTitle": "Murder",
            "CaseDescription": "2 people killed their friend",
            "RegistrarName": "Huzaifa"
        }
    };
    // let obj = await Multichain.multichain_publish("stream1", "key", temp);
    multichainobj.publish(["stream1", "key", temp]).then(resp => {


        return res.status(200).json({
            result: resp,
            message: "success"
        });
    }).catch(err => {
        return res.status(500).json({
            error: err,
            msg: "exception"
        });
    });





};
exports.multichain_getstream_item = async (req, res, next) => {
    // let obj = await Multichain.multichain_publish("stream1", "key", temp);
    const streamname = req.params.stream;
    const txid = req.params.txid;
    console.log("streamname: " + streamname + "id" + txid);
    multichainobj.getStreamItem([req.params.stream, req.params.txid]).then(resp => {


        return res.status(200).json({
            result: resp,
            message: "success"
        });
    }).catch(err => {
        return res.status(500).json({
            error: err,
            msg: "exception"
        });
    });

};

//  multichain.subscribe(["stream1", {
//          "rescan": true
//      }],

//  multichain.publish(['stream1', 'key2', obj],

// ["stream1", {
//      "verbose": false
//  }, {
//      "count": 10
//  }, {
//      "start": "startDefault"
//  }, {
//      "local-ordering": false
//  }],
//  {

//      stream: "Stream1",

//      verbose: false,
//      count: 100,
//      start: "startDefault",
//      "local-ordering": false
//  },
//  multichain.listStreamItems(
//  ["stream1", {
//      "verbose": "false"
//  }, {
//      "count": 10
//  }, {
//      "start": "startDefault"
//  }, {
//      "local-ordering": false
//  }],



// .exec()
// .then(docs => {
//     res.status(200).json({
//         count: docs.length,
//         data: docs
// .map(doc => {
//     return {
//         _id: doc._id,
//         product: doc.product,
//         quantity: doc.quantity,
//         request: {
//             type: "GET",
//             url: "http://localhost:3000/orders/" + doc._id
//         }
//     };
// })
//     });
// })
// .catch(err => {
//     res.status(500).json({
//         error: err
//     });
// });