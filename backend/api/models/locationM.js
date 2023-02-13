const mongoose = require('mongoose');

const cityLocations = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    // product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    city: {
        type: String
    },
    locations: [{
        name: String
    }]
});

module.exports = mongoose.model('CityLocations', cityLocations);