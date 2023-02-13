const mongoose = require("mongoose");

const Data = require("../models/dataM");
// const Product = require("../models/product");

exports.data_get_all = (req, res, next) => {
    Data.find()
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

exports.data_create = (req, res, next) => {
    const data = new Data({
        _id: new mongoose.Types.ObjectId(),
        dataobj: req.body.obj
    });
    data
        .save()
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

exports.data_get = (req, res, next) => {
    const id = req.params.id;
    Data.findById(id)
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
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

// exports.data_update = (req, res, next) => {
//     const id = req.params.id;
//     const updateOps = {};
//     for (const ops of req.body) {
//         updateOps[ops.propName] = ops.value;
//     }
//     Product.update({ _id: id }, { $set: updateOps })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Product updated",
//                 request: {
//                     type: "GET",
//                     url: "http://localhost:3000/products/" + id
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };

// exports.products_delete = (req, res, next) => {
//     const id = req.params.productId;
//     Product.remove({ _id: id })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "Product deleted",
//                 request: {
//                     type: "POST",
//                     url: "http://localhost:3000/products",
//                     body: { name: "String", price: "Number" }
//                 }
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// };
