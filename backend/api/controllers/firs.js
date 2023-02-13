const mongoose = require("mongoose");

let locallyCreated = false;
const Fir = require("../models/fir");
const helper = require("./helpers");
const { update } = require("../models/fir");
const fir = require("../models/fir");
const asciiConverter = require("binascii");
const fs = require('fs')
const multichain = require("multichain-node")({

    // port: process.env.multichainport,
    // host: process.env.multichainhost,
    // user: process.env.multichainuser,
    // pass: process.env.multichainpass
    port: "4796",
    host: "127.0.0.1",
    user: "multichainrpc",
    pass: "78rddKGisrTn2uRNfZjaVZY5ukhVWaJFC2AFzq9t5WEN"

});

exports.firs_get_all = (req, res, next) => {
    Fir.find().exec()
        .then(docs => {
            const response = {
                count: docs.length,
                firs: docs
                // docs.map(doc => {
                //     return {
                //         name: doc.name,
                //         price: doc.price,
                //         productImage: doc.productImage,
                //         _id: doc._id,
                //         request: {
                //             type: "GET",
                //             url: "http://localhost:3000/products/" + doc._id
                //         }
                //     };
                // })
            };
            //   if (docs.length >= 0) {
            res.status(200).json(response);
            //   } else {
            //       res.status(404).json({
            //           message: 'No entries found'
            //       });
            //   }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.fir_create = (req, res, next) => {
    var filedata = "";
    var filepath = "C:/Users/lab/Desktop/file.txt";
    filedata = asciiConverter.hexlify(filepath);

    // fs.readFile('C:/Users/lab/Desktop/file.txt', 'utf8' , (err, data) => {
    //     if (err) {
    //       console.error(err)
    //       //return
    //     }
    //     filedata=data;
    //   })

    let inputobj = {
        PersonName: req.body.PersonName,
        PersonCnic: req.body.PersonCnic,
        IncidentLocation: req.body.IncidentLocation,
        CrimeType: req.body.CrimeType,
        District: req.body.District,
        PoliceStationAddress: req.body.PoliceStationAddress,
        CaseTitle: req.body.CaseTitle,
        CaseDescription: req.body.CaseDescription,
        RegistrarName: req.body.RegistrarName,
        Status: req.body.Status,
        InvestigationStatus: '',
        OperationType: 1,
        DataChanged: false



    };
    //   Needs to take hash
    // inputobj.Hash="";
    //filedata=asciiConverter.unhexlify(filedata);

    const hash = helper.generatehash(inputobj);
    console.log("creatoin hash" + hash)
    inputobj.Hash = hash;
    inputobj.FirstCreationHash = hash;
    // multichain 
    let multichainObj = {
        "json": inputobj
    };
    inputobj._id = new mongoose.Types.ObjectId(),
        //check if already exists
        // var collection = mongoose.Collection("firs");
        // m_err="FIR data already exists"
        // collection.find({Hash: inputobj.hash}),{$exists:true}.toArray(function(m_err,inputobj)
        // {
        //     if(inputobj)
        //     {console.log(m_err)}

        // });
        multichain.publish(["stream1", "key", multichainObj])
            .then(resp => {
                const streamId = [resp];
                inputobj.StreamId = streamId
                const fir = new Fir(inputobj);
                res.status(201).json({
                    message: "Created Fir successfully",
                    data: resp

                });
                // fir.save()
                //     .then(result => {
                //         console.log(result);
                //         locallyCreated = true;

                //     })
                //     .catch(err => {
                //         console.log(err);
                //         return res.status(500).json({
                //             error: err
                //         });
                //     });


            }).catch(err => {
                console.log(err);

                return res.status(500).json({
                    error: err,
                    msg: "exception"
                });
            });

};
exports.fir_store_create_transaction_in_db = (input_var, index) => {

    if (input_var != null && input_var != undefined) {
        //  if () {
        let transaction_information = input_var.data.json;
        let transaction_id = input_var.txid;
        let inputobj =
        {
            _id: new mongoose.Types.ObjectId(),
            PersonName: transaction_information.PersonName,
            PersonCnic: transaction_information.PersonCnic,
            IncidentLocation: transaction_information.IncidentLocation,
            CrimeType: transaction_information.CrimeType,
            District: transaction_information.District,
            PoliceStationAddress: transaction_information.PoliceStationAddress,
            CaseTitle: transaction_information.CaseTitle,
            CaseDescription: transaction_information.CaseDescription,
            RegistrarName: transaction_information.RegistrarName,
            Status: transaction_information.Status,
            InvestigationStatus: "",
            OperationType: 1,
            Hash: transaction_information.Hash,
            FirstCreationHash: transaction_information.FirstCreationHash,
            DataChanged:transaction_information.DataChanged

        };
        //   Needs to take hash
        // inputobj.Hash="";
        // const hash = helper.generatehash(inputobj);
        // inputobj.Hash = hash;
        //inputobj.FirstCreationHash=hash;
        const streamId = [transaction_id];
        inputobj.StreamId = streamId;
        const fir = new Fir(inputobj);
        fir.save().then(result => {
            console.log(result);
            // res.status(201).json({
            //     message: "Saved in DB",
            //     data: result

            // });
        })
            .catch(err => {
                console.log(err);
                return res.status(500).json({
                    error: err
                });
            });
        // }
        //locallyCreated = false;

    };

}
exports.fir_get = (req, res, next) => {
    const id = req.params.firId;
    Fir.findById(id).select("-__v")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                // calculate hash
                let obj = {
                    // _id: doc._id,
                    PersonName: doc.PersonName,
                    PersonCnic: doc.PersonCnic,
                    IncidentLocation: doc.IncidentLocation,
                    CrimeType: doc.CrimeType,
                    District: doc.District,
                    PoliceStationAddress: doc.PoliceStationAddress,
                    CaseTitle: doc.CaseTitle,
                    CaseDescription: doc.CaseDescription,
                    RegistrarName: doc.RegistrarName,
                    Status: doc.Status,
                    InvestigationStatus: doc.InvestigationStatus,
                    OperationType: doc.OperationType,
                    DataChanged: doc.DataChanged


                };
                //   Needs to take hash

                const hash = helper.generatehash(obj);
                console.log("hash from db data " + hash)
                let hashresult = false;
                // obj._id = doc.id;
                // return res.status(200).json({
                //     fir: doc
                //     // request: {
                //     //     type: "GET",
                //     //     url: "http://localhost:3000/products"
                //     // }
                // });
                if (hash === doc.Hash) {
                    // if hash matches send resposne
                    hashresult = true;
                    return res.status(200).json({
                        fir: doc,
                        hashmatched: hashresult,
                        calculatedhash: hash,
                        dbhash: doc.Hash
                        // request: {
                        //     type: "GET",
                        //     url: "http://localhost:3000/products"
                        // }
                    });
                }
                // if hash not match get data from multichain
                // get multichain item
                else {
                    console.log('streamid reading', doc.StreamId[0]);
                    multichain.getStreamItem(["stream1", doc.StreamId[0]]).then(resp => {

                        // multichain doc,
                        const firobj = resp.data.json;

                        let chainInformation = {
                            _id: firobj._id,
                            PersonName: firobj.PersonName,
                            PersonCnic: firobj.PersonCnic,
                            IncidentLocation: firobj.IncidentLocation,
                            CrimeType: firobj.CrimeType,
                            District: firobj.District,
                            PoliceStationAddress: firobj.PoliceStationAddress,
                            CaseTitle: firobj.CaseTitle,
                            CaseDescription: firobj.CaseDescription,
                            RegistrarName: firobj.RegistrarName,
                            Status: firobj.Status,
                            InvestigationStatus: firobj.InvestigationStatus,
                            OperationType: firobj.OperationType

                        };
                        // return res.status(200).json({
                        //     message: "Chain Fir updated  successfully into db ",
                        //     fir: chainInformation

                        // });
                        // update this record into db and send
                        if (doc.DataChanged) {
                            let index=doc.StreamId.length-1;
                            multichain.getStreamItem(["stream1", doc.StreamId[index]]).then(updated_info_resp => {
                                let update_resp=updated_info_resp.data.json;
                                firobj.Status = update_resp.Status;
                                firobj.InvestigationStatus = update_resp.InvestigationStatus;
                                firobj.DataChanged = update_resp.DataChanged;
                                chainInformation.Status = update_resp.Status;
                                chainInformation.InvestigationStatus = update_resp.InvestigationStatus;
                                chainInformation.DataChanged = update_resp.DataChanged;
                                //this.fix_db_from_multichain(firobj, chainInformation);
                                const updateOps = {};
                                updateOps["PersonName"] = firobj.PersonName;
                                updateOps["PersonCnic"] = firobj.PersonCnic;
                                updateOps["IncidentLocation"] = firobj.IncidentLocation;
                                updateOps["CrimeType"] = firobj.CrimeType;
                                updateOps["District"] = firobj.District;
                                updateOps["PoliceStationAddress"] = firobj.PoliceStationAddress;
                                updateOps["CaseTitle"] = firobj.CaseTitle;
                                updateOps["CaseDescription"] = firobj.CaseDescription;
                                updateOps["RegistrarName"] = firobj.RegistrarName;
                                updateOps["Status"] = firobj.Status;
                                updateOps["InvestigationStatus"] = firobj.InvestigationStatus;
                                updateOps["OperationType"] = firobj.OperationType;
                                updateOps["Hash"] = firobj.Hash;
                                updateOps["FirstCreationHash"] = firobj.FirstCreationHash;
                                updateOps["DataChanged"] = firobj.DataChanged;
                                // updateOps["updatedAt"] = firobj.updatedAt;
                                // updateOps["createdAt"] = firobj.createdAt;
                                Fir.findOneAndUpdate({ FirstCreationHash: firobj.FirstCreationHash }, { $set: updateOps }, {
                                    new: true
                                }).then(updateddoc => {
                                    return res.status(200).json({
                                        message: "Chain Fir updated  successfully into db ",
                                        fir: chainInformation
                            
                                    });
                                })
                                    .catch(e => {
                                        return res.status(500).json({
                                            error: e,
                                            message: "chain FIR updation failed"
                                        });
                                    });

                            }).catch(err => {
                                return res.status(500).json({
                                    error: err,
                                    msg: "exception"
                                });
                            });
                        }
                        else {
                            //this.fix_db_from_multichain(firobj, chainInformation);
                            const updateOps = {};
                            updateOps["PersonName"] = firobj.PersonName;
                            updateOps["PersonCnic"] = firobj.PersonCnic;
                            updateOps["IncidentLocation"] = firobj.IncidentLocation;
                            updateOps["CrimeType"] = firobj.CrimeType;
                            updateOps["District"] = firobj.District;
                            updateOps["PoliceStationAddress"] = firobj.PoliceStationAddress;
                            updateOps["CaseTitle"] = firobj.CaseTitle;
                            updateOps["CaseDescription"] = firobj.CaseDescription;
                            updateOps["RegistrarName"] = firobj.RegistrarName;
                            updateOps["Status"] = firobj.Status;
                            updateOps["InvestigationStatus"] = firobj.InvestigationStatus;
                            updateOps["OperationType"] = firobj.OperationType;
                            updateOps["Hash"] = firobj.Hash;
                            updateOps["FirstCreationHash"] = firobj.FirstCreationHash;
                            updateOps["DataChanged"] = firobj.DataChanged;
                            // updateOps["updatedAt"] = firobj.updatedAt;
                            // updateOps["createdAt"] = firobj.createdAt;
                            Fir.findOneAndUpdate({ FirstCreationHash: firobj.FirstCreationHash }, { $set: updateOps }, {
                                new: true
                            }).then(updateddoc => {
                                return res.status(200).json({
                                    message: "Chain Fir updated  successfully into db ",
                                    fir: chainInformation
                        
                                });
                            })
                                .catch(e => {
                                    return res.status(500).json({
                                        error: e,
                                        message: "chain FIR updation failed"
                                    });
                                });
                        }


                        //   this.fir_update_db_call(fir.FirstCreationHash, chainInformation,1,null)



                        //End updation db
                    }).catch(err => {
                        return res.status(500).json({
                            error: err,
                            msg: "exception"
                        });
                    });
                }




            } else {
                return res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};
exports.fix_db_from_multichain = (firobj, chainInformation) => {
    const updateOps = {};
    updateOps["PersonName"] = firobj.PersonName;
    updateOps["PersonCnic"] = firobj.PersonCnic;
    updateOps["IncidentLocation"] = firobj.IncidentLocation;
    updateOps["CrimeType"] = firobj.CrimeType;
    updateOps["District"] = firobj.District;
    updateOps["PoliceStationAddress"] = firobj.PoliceStationAddress;
    updateOps["CaseTitle"] = firobj.CaseTitle;
    updateOps["CaseDescription"] = firobj.CaseDescription;
    updateOps["RegistrarName"] = firobj.RegistrarName;
    updateOps["Status"] = firobj.Status;
    updateOps["InvestigationStatus"] = firobj.InvestigationStatus;
    updateOps["OperationType"] = firobj.OperationType;
    updateOps["Hash"] = firobj.Hash;
    updateOps["FirstCreationHash"] = firobj.FirstCreationHash;
    Fir.findOneAndUpdate({ FirstCreationHash: firobj.FirstCreationHash }, { $set: updateOps }, {
        new: true
    }).then(updateddoc => {
        return res.status(200).json({
            message: "Chain Fir updated  successfully into db ",
            fir: chainInformation

        });
    })
        .catch(e => {
            return res.status(500).json({
                error: e,
                message: "chain FIR updation failed"
            });
        });

}
// dont call search api with empty params
exports.fir_search = (req, res, next) => {
    // const searchfir = "/" + req.params.firsearch + "/i";
    let searchfir;
    searchfir = req.params.firsearch;
    console.log("searchfir" + searchfir);

    // User.find({$or:[{region: "NA"},{sector:"Some Sector"}]}
    console.log(searchfir);
    Fir.find({
        $or: [
            {
                PersonName: new RegExp(searchfir, 'i')
            },
            {
                PersonCnic: new RegExp(searchfir, 'i')
            },
            {
                IncidentLocation: new RegExp(searchfir, 'i')
            },
            {
                CrimeType: new RegExp(searchfir, 'i')
            },
            {
                District: new RegExp(searchfir, 'i')
            },
            {
                PoliceStationAddress: new RegExp(searchfir, 'i')
            },
            {
                CaseTitle: new RegExp(searchfir, 'i')
            },
            {
                CaseDescription: new RegExp(searchfir, 'i')
            },
            {
                RegistrarName: new RegExp(searchfir, 'i')
            },
            {
                Status: new RegExp(searchfir, 'i')
            }
        ]
    })
        .exec()
        .then(doc => {
            // console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    fir: doc,
                    // request: {
                    //     type: "GET",
                    //     url: "http://localhost:3000/products"
                    // }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.fir_store_update_transaction = (transaction_data, index) => {
    transaction_data = transaction_data.data.json;

    const updateOps = {};
    updateOps["InvestigationStatus"] = transaction_data.InvestigationStatus ? transaction_data.InvestigationStatus : "";
    updateOps["Status"] = transaction_data.Status ? transaction_data.Status : ""
    updateOps["Hash"] = transaction_data.FullBlockDataHash ? transaction_data.FullBlockDataHash : "";
    updateOps["Stream"] = transaction_data.StreamId ? transaction_data.StreamId : "";
    updateOps["DataChanged"]=transaction_data.DataChanged ? transaction_data.DataChanged : false;
    this.fir_update_db_call(transaction_data.FirstCreationHash, updateOps, 0, null);



}
exports.fir_update_db_call = async (CreatedHash, data, action, res) => {
    if (action == 1) { // for simple call to db
        Fir.findOneAndUpdate({ FirstCreationHash: CreatedHash }, { $set: data }, {
            new: true
        }).then(updateddoc => {
            return res.status(200).json({
                message: "Fir updated successfully",
                data: updateddoc

            });
        })
            .catch(e => {
                return res.status(500).json({
                    error: e,
                    message: "last updation record into db failed"
                });
            });

    }
    else {
        try {
            Fir.findOneAndUpdate({ FirstCreationHash: CreatedHash }, { $set: data }, {
                new: true
            }).then(doc => {
                return doc;
            })
                .catch(e => {
                    console.log(e);
                });

        }
        catch (e) {
            console.log(e);
        }



    }


}
exports.fir_update_multichain = (CreatedHash, multichainObj, streamId, hash, res) => {

    // push new data stream
    multichain.publish(["stream1", "key", multichainObj]).then(stid => {
        streamId.push(stid);
        const chainInformation = {
            Hash: hash,
            StreamId: streamId
        };

        this.fir_update_db_call(CreatedHash, chainInformation, 1, res);

    }).catch(err => {
        console.log(err);
    });


}
exports.fir_update_preprocess = async (req, res, next) => {
    const id = req.params.firId;
    console.log("req body " + req.body);
    const updateOps = {};
    for (const ops of req.body.data) {
        updateOps[ops.propName] = ops.value;
    }
    try {
        let doc = await Fir.findOneAndUpdate({ _id: id }, { $set: updateOps }, {
            new: true
        });
        // update new hash
        let updateddocobj = {

            PersonName: doc.PersonName,
            PersonCnic: doc.PersonCnic,
            IncidentLocation: doc.IncidentLocation,
            CrimeType: doc.CrimeType,
            District: doc.District,
            PoliceStationAddress: doc.PoliceStationAddress,
            CaseTitle: doc.CaseTitle,
            CaseDescription: doc.CaseDescription,
            RegistrarName: doc.RegistrarName,
            Status: doc.Status,
            InvestigationStatus: doc.InvestigationStatus ? doc.InvestigationStatus : "",
            OperationType: 2,
            DataChanged:true

        };
        //   Needs to take hash

        const hash = helper.generatehash(updateddocobj);
        updateddocobj.Hash = hash;
        updateddocobj.PreviousHash = doc.Hash ? doc.Hash : "";
        updateddocobj.StreamId = doc.StreamId ? doc.StreamId : "";
        updateddocobj._id = doc._id;
        let transactionRelevantData = {

            Status: doc.Status,
            InvestigationStatus: doc.InvestigationStatus ? doc.InvestigationStatus : "",
            OperationType: 2,
            DataChanged:true,
            FullBlockDataHash: hash,
            FirstCreationHash: doc.FirstCreationHash,
        };
        const transactionHash = helper.generatehash(transactionRelevantData);
        transactionRelevantData.Hash = transactionHash;
        transactionRelevantData.PreviousHash = updateddocobj.PreviousHash;
        transactionRelevantData.StreamId = updateddocobj.StreamId;
        transactionRelevantData._id = doc._id;
        let streamId = doc.StreamId;
        let multichainObj = {
            "json": transactionRelevantData
        };
        this.fir_update_multichain(doc.FirstCreationHash, multichainObj, streamId, hash, res);
        // push new streamid to db

    }
    catch (e) {
        return res.status(500).json({
            error: e,
            message: "first updation into db failed"
        });
    }
    // .then(result => {
    //     res.status(200).json({
    //         message: "fir updated",
    //         request: {
    //             type: "GET",
    //             url: `http://localhost:${process.env.Port}/fir/` + id
    //         }
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //         error: err
    //     });
    // });


    // Fir.update({ _id: id }, { $set: updateOps })
    //     .exec()
    //     .then(result => {
    //         res.status(200).json({
    //             message: "fir updated",
    //             request: {
    //                 type: "GET",
    //                 url: `http://localhost:${process.env.Port}/fir/` + id
    //             }
    //         });
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         });
    //     });
    // 

};


