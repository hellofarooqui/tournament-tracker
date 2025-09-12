import jwt from 'jsonwebtoken';

export const verifyToken = async (req,res,next) => {
    console.log("Verifying token...");
    const authHeader = req.headers.authorization;
    //console.log("Auth Header:", req.headers);
    if(!authHeader){
        return res.status(401).json({message: "No token provided"});
    }
    const token = authHeader.split(" ")[1];
    if(!token){
        console.log("No token found after Bearer", token);
        return res.status(401).json({message: "Invalid token"});
    }
    req.token = token;
    try{
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch(error){
        console.error("Token verification failed:", error);
        return res.status(401).json({message: "Invalid token"});
    }
   
}