const User = require('../Modules/User')
const jwt = require('jsonwebtoken')
const maxAge = 5 * 24*60*60;
const createJWT = id => {
    return jwt.sign({id},'chatroom secrete',{
        expiresIn:maxAge
    })
}
const alertError=(err) => {
    let errors = {email:'', name:'', password:''}
    console.log('error message:', err.message);
    console.log('error code:', err.code);
    // console.log('error', err);
    if (err.message ==='Incorrect password') {
        errors.password = 'The password is incorrect'
    }
    if (err.message ==='Incorrect email') {
        errors.email = 'This Email is Not found'
    }
    if (err.message.includes('user validation failed'))
    {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message
        })
    }
    if (err.code === 11000) {
        errors.email= 'This email is already register.'
        
    }
    return (errors);
}
module.exports.signup = async (req, res) => {
    const {name, email, password} = req.body;
    try {
       const user = await User.create({name, email, password})
       const token = createJWT(user._id);
       res.cookie('jwt', token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user})
    } catch (error) {
        // console.log("error message: " + error.message);
        // console.log(`error code ${error.code}`);
        let errors= alertError(error)
        res.status(404).json({errors});
        
    }
}
module.exports.login = async (req, res) => {
   const { email, password} = req.body;
    try {
       const user = await User.login( email,password)
       const token = createJWT(user._id);
       res.cookie('jwt', token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json({user})
    } catch (error) {
        // console.log("error message: " + error.message);
        // console.log(`error code ${error.code}`);
        let errors= alertError(error)
        res.status(404).json({errors});
        
    }
}
module.exports.verifyuser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token,'chatroom secrete', async(err,decodedToken) => {
            console.log(decodedToken);
            if (err) {
                    console.log(err.message);
            } else{
                let user = await User.findById(decodedToken.id)
                res.json(user);
                next();
            }
        })
    } else {
        next();
    }
}
module.exports.logout = (req, res, next) => {
    res.cookie('jwt','', {maxAge:1})
    res.status(200).json({logout:true});
}