const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    dataobj: { type: Object }
});

module.exports = mongoose.model('Data', dataSchema);