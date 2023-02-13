
const crypto = require('crypto');
// let obj = { "__v": 0, "updatedAt": "2020-05-20T21:05:01.666Z", "createdAt": "2020-05-20T21:05:01.666Z", "_id": "5ec59b7d7c8c694a14c83b6b", "PersonName": "Multichain Testing1", "PersonCnic": "3310062212345", "IncidentLocation": "St # 02 Model Town house 332", "CrimeType": "Violence", "District": "Punjab", "PoliceStationAddress": "Model Town", "CaseTitle": "Murder", "CaseDescription": "2 people killed their friend", "RegistrarName": "MultichainHuzaifa", "Status": "pending" };

exports.generatehash = (obj) => {
    const res = crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex');
    return res;
}

// compare = (obj, obj1) => {
//     if (obj === obj1) {
//         console.log("same hash");
//     }
//     else {
//         console.log("different hash");

//     }
// }
// compare(generatehash(obj), generatehash(obj));
// let obj1 = { "__v": 0, "updatedAt": "2020-05-20T21:05:01.666Z", "createdAt": "2020-05-20T21:05:01.666Z", "_id": "5ec59b7d7c8c694a14c83b6b", "PersonName": "Multichain Testing1", "PersonCnic": "3310062212345", "IncidentLocation": "St # 02 Model Town house 332", "CrimeType": "Violence", "District": "Punjab", "PoliceStationAddress": "Model Town", "CaseTitle": "Murder", "CaseDescription": "2 people killed their friend", "RegistrarName": "MultichainHuzaifa", "Status": "pendingg" };
// compare(generatehash(obj), generatehash(obj1));

