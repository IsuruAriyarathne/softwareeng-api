const {USER_TYPES_OBJ} = require('../utils/constants')
exports.authorize = (userTypes) => (req,res,next) =>{
    userTypes = Array.isArray(userTypes) ? userTypes : [userTypes]
    console.log(userTypes);
    console.log(req.user.role);
    if(req.hasOwnProperty('user')){
        if(req.user.hasOwnProperty('role') && userTypes.includes(req.user.role)){
            next();
        }
        else{
        return res.status(401).send("You are unauthorized")
        }
    }
    else{
        return res.status(401).send("You are unauthorized")
    }
}