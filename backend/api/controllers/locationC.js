const mongoose = require("mongoose");

const CityLocation = require("../models/locationM");
// const CityLocation = require("../models/product");

exports.location_get_all = (req, res, next) => {
    CityLocation.find()
        // .select("product quantity _id")
        // .populate("product", "name")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                data: docs
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
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};

exports.location_create = (req, res, next) => {
    const data = new CityLocation({
        _id: new mongoose.Types.ObjectId(),
        city: req.body.city,
        locations: req.body.locations
    });

    data.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Created data successfully",
                result: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.location_get = (req, res, next) => {
    const id = req.params.id;
    CityLocation.findById(id)
        // .select("name price _id productImage")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    result: doc,

                });
            } else {
                res
                    .status(404)
                    .json({
                        message: "No valid entry found for provided ID"
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.location_update = (req, res, next) => {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    CityLocation.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Data updated",
                // request: {
                //     type: "GET",
                //     url: "http://localhost:3000/products/" + id
                // }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.city_delete = (req, res, next) => {
    const id = req.params.id;
    CityLocation.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Data deleted",


            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
// exports.location_delete = (req, res, next) => {
//     const _id = req.params.id;
//     // parent.children.id(_id).remove(); //remove sub document
//     CityLocation.locations.id(_id).remove({
//             _id: id
//         })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Data deleted",


//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };