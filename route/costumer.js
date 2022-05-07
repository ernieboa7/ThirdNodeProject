const express = require('express');
const {registration, login} = require('../controller/costumer');
const {emailvalid} = require('../middleware/validation');
const route = express.Router();

route.post('/registration', emailvalid, registration);
route.post('/login', login);





module.exports= route;