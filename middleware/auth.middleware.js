const jwt = require("jsonwebtoken");

const auth = (req, res, next)=>{
    const token = req.headers.authorization?.split(" ")[1];
    if(token){
        const decoded = jwt.verify(token, "abhay");
        console.log(decoded)
        if(decoded){
            req.body.userID = decoded.userID;
            req.body.author = decoded.author;
            next();
        }else{
            res.status(200).send({msg: "You are not authorized"})

        }
    }else{
        res.status(400).send({msg: "You are not authorized"})
    }
}

module.exports={
    auth
}