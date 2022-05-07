const express = require('express');
const app = express();
const cors = require('cors');
const {connect} = require('./connection/connectmongodb');
const costume= require('./route/costumer');
const transaction = require('./route/transactions')
const configuration= require('dotenv');
configuration.config();

app.use(express.json());
connect();
app.use(cors())

app.use('/costume', costume);
app.use('/transaction', transaction);
app.get('/', (req, res)=>{
    res.send('Please be nice to people');
    console.log('Good people');
})




app.listen(process.env.port, (req,res)=>{

    console.log('port is listening at 9001')
});
