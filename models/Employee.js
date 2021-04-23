const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

    employeeName: {
        type: String,
       
    },
    date: {
        type: String,
        
    },
    age: {
        type: String
    },
    employeeNum: {
        type: String,
        unique: true,
       
    },
    nin: {
        type: String,
        unique: true,
        
    },
    phoneNumber: {
        type: String,
        
    },
    residence: {
        type: String,
        
    },
    gender: String,
    role: String,
    license: {
        type: String,
    },
    incidents: [{
        type: String
    }],
    imageUpload: String
});

module.exports = mongoose.model('Employee', employeeSchema);