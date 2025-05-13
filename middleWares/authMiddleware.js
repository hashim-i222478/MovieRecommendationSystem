
import jwt from 'jsonwebtoken';

//middleware to verify jwt token
const verify_jwt_token = (req, res, next) => {
    const authHeader = req.headers.authorization; //get the authorization header
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer token

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {  //verify the token
            if (err) {
                return res.sendStatus(403).json({ message: "Token is not valid" });
            }
            req.user = user;
           // res.send(user);
            next();
        });
    } else {
        res.sendStatus(401).json({ message: "You are not authenticated" });
    }

};

//middleware to check if user is admin
const check_admin = (req, res, next) => { 
    if (req.user && req.user.role == "admin") {
        next();
    } else {
        console.log(req.user);
        console.log(req.user.role);
        console.log("Not an admin");
        res.sendStatus(403).json({ message: "User Not an admin" });
    }
};


export { verify_jwt_token, check_admin };


