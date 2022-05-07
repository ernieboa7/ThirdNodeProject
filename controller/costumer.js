const costmodel= require('../models/costumer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registration= async (req, res)=>{
    try{
    
        const salt = await bcrypt.genSalt(10);
        console.log(req.body);
        const hashpassword= await bcrypt.hash(req.body.password, salt)

        req.body.password = hashpassword
        const user = await costmodel.create(req.body)
        
    res.json({user})
        
    }
    catch(err){
    
        console.log(err);

    }
};

exports.login = async (req,res) =>{
    const {email, password} = req.body;
    // check if user enter correct password and email
    if (!email || !password){
        return res.status(403).json({status:false, message:'please provide email and pw'});

    }
    // check if email exist in database
    const user= await costmodel.findOne({email});
    if (!user){
        return res.status(500).json({status:false, message:'email does not exist'});
    }

    // check for correct password
    // first compare password
    const ispasswordcorect = await bcrypt.compare(password, user.password);
    console.log(ispasswordcorect);
       if(ispasswordcorect){
           // generate token
        const token= await jwt.sign({email, id: user._id}, process.env.jwt,{expiresIn:"1d"});
        return res.status(200).json({token, status: true});


       }
    
        res.status(500).json({status: false, msg: 'Password is incorrect'});

       
    }

      
        //if user exit i return a token

