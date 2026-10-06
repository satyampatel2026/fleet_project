const jwt=require('jsonwebtoken');

function auth(req,res,next){
    const token= req.headers.authorization;
    if(!token){
       return res.send("token required")
    }
    try{
        const decoded= jwt.verify(
            token, "secretkey"
        )
         req.user=decoded;
        next();
    }catch(error){
      return res.send("invalid token")
    }
}

module.exports=auth;