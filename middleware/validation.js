const costmodel = require('../models/costumer');

exports.emailvalid = async (req, res, next)=>{
    try{
//extract email form request body
const useremail = req.body.email;

// check if email already exist
const userdata= await costmodel.findOne({email:useremail});
// if true return error
console.log(userdata);
if(userdata){
    return res.status(403).json({message:'email already exist'});
}
    }
    catch(err){
        res.status(500).json({message:'server error please contact admin'})

    }
next();
}

