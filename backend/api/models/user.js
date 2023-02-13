const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    readPermission: {
        type: Boolean,
        default: true
    },
    writePermission: {
        type: Boolean,
        default: true
    },
    authorizePermission: {
        type: Boolean,

        default: false
    },
    usersCreationPermission: {
        type: Boolean,

        default: false
    },
    cityLocation: {
        id: mongoose.Schema.Types.ObjectId,
        city: String,
        locationId: mongoose.Schema.Types.ObjectId,
        location: String
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);