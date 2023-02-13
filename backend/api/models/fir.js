const mongoose = require('mongoose');

const FirSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    PersonName: {
        type: String
    },
    PersonCnic: {
        type: String
    },
    IncidentLocation: {
        type: String
    },
    CrimeType: {
        type: String
    },
    District: {
        type: String
    },
    PoliceStationAddress: {
        type: String
    },
    CaseTitle: {
        type: String
    },
    CaseDescription: {
        type: String
    },
    RegistrarName: {
        type: String
    },
    Status: {
        type: String,
        default: "pending"
    },
    StreamId: {
        type: [String]
    },
    DataChanged:{
        type: Boolean
    },
    Hash: {
        type: String
    },
    InvestigationStatus: {
        type: String,

    },
    OperationType: {
        type: Number,

    },
    FirstCreationHash:{
        type:String,
    },

}, {
    timestamps: true
}
);

module.exports = mongoose.model('Fir', FirSchema);