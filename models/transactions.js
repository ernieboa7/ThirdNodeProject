const mongoose = require('mongoose');


const transact = new mongoose.Schema(
    { 
        operations : String,
        accountNumber: String,
        amount: Number,
        email: String


},
{
    timestamps : true
}

)

const transmod= mongoose.model('transaction', transact);
module.exports = transmod;