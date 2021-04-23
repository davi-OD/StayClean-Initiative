const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({

    customerName: {
        type: String,
       
    },
    contact: {
        type: String,
        
    },
    idNumber: {
        type: String
    },
    location: {
        type: String,
       
    },
    orderNumber: {
        type: String,
        unique: true,
        
    },
    orderTime: {
        type: String,
        
    },
    serviceType: Array,
    numberOFTrucks: {
        type: String
    },
    accoutType: String, 
    charge: String,
    truckNumber: {
        type: String
    }
});

module.exports = mongoose.model('Orders', ordersSchema);