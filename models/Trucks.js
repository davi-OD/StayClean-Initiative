const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    truckName: {
        type: String
    },
    modelNumber: {
        type: String
    },
    truckNumber: {
        type: String,
        unique: true
    },
    truckType: String,
    truckStatus: String
});

module.exports = mongoose.model('Trucks', truckSchema);