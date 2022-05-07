const mongoose = require('mongoose');


const costschema = new mongoose.Schema(
    {
        firstname: String,
        lastname: String,
        email: String,
        password: String,
        balance: {
            type: Number,
            default: 0
        },
        identityType: String,
        identityNumber: Number,
        status:{
            type: String,
            default: 'Inactive'
        },
        phoneNumber: Number,
        walletId: Number
        
    },
    {
        timestamps: true

    }
);

const costmodel = mongoose.model('user', costschema);
module.exports = costmodel;