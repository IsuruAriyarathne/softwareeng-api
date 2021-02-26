exports.authorize = (userTypes) => (req,res,next) =>{
    userTypes = Array.isArray(userTypes) ? userTypes : [userTypes]
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