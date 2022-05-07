const transact = require('../models/transactions');
const costum = require('../models/costumer');

exports.credit = async (req, res)=>{
    // extract amount and email from req.body
    const {amount, email, accountNumber}= req.body;
    const user= await costum.findOne({email});
    if (!user){
        return res.status(500).json({status:false, message:'email does not exist'});
    }

// add amount to customer balance
const balance= user.balance + amount
const filter = {email};
const update = {balance};

// `doc` is the document _before_ `update` was applied
let doc = await costum.findOneAndUpdate(filter, update)
//log the req to transaction
const transaction = await transact.create({
    operations : 'credit',
    accountNumber,
    amount,
    email

});
res.json({transaction})
}

exports.debit = async (req, res) =>{

// extract amount and email form request body
const {amount, email, accountNumber} = req.body;
const user = await costum.findOne({email})
if(!user){
    return res.status(500).json({status:false, message:'Cannot perform this operation'});
}
// check for sufficient balance
if(user.balance < amount){
    return res.json({message:'balance is low'});
}
// remove amount from balance in the database
const balance = user.balance - amount;
const filter = {email};
const update = {balance};
let doc = await costum.findOneAndUpdate(filter, update);
// log transaction to transaction file
const trasaction = await transact.create({
   operations: 'debit',
   accountNumber,
   amount,
   email 
});
res.json({trasaction});

}


exports.mobTransactionLog= async (req, res)=>{
    // identify costumer transaction
    const email = req.params.transId;
    // find give all the transactions for a customer
    const transac = await transact.find({email}).sort({createdAt: -1}).limit(1);
    return res.json({transac});
    
}


exports.cashTransactionLog= async (req, res)=>{
    // identify costumer transaction
    const email = req.params.transId;
    // find give all the transactions for a customer
    const transac = await transact.find({email}).sort({createdAt: -1});
    return res.json({transac});
    
}