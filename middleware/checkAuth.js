const jwt = require("jsonwebtoken")
const checkAuth = async function(req,res,next){
   const token = req.cookies?.token;
   if(!token){
    console.log("invalid token");
    return res.redirect('/login')
   }
   else{
    const payload = jwt.verify(token,"my name is yash");
    req.user = payload;
    next();
   }
}

module.exports = checkAuth