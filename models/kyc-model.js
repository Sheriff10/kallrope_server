const mongoose = require('mongoose')

const KYCSchema = mongoose.Schema({
    driver_ID: {type: String},
    driverPhoto: {type: String, default: ''},
    driverLiscence: {type: String, default: ''},
    vehicleIsurancePolicy: {type: String, default: ''},
    vehicleInspectionReport: {type: String, default: ''},
    verified: {type:String, default: false}
})
const KYC = mongoose.model('KYC', KYCSchema)

module.exports = KYC