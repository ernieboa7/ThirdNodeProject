const express = require('express');
const {credit, debit, mobTransactionLog, cashTransactionLog} = require('../controller/transaction');
const route = express.Router();

route.put('/credit', credit);
route.put('/debit', debit);
route.get('/transac/:transId', mobTransactionLog);
route.get('/cashtransac/:transId', cashTransactionLog);






module.exports= route;