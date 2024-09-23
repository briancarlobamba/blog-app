const jwt = require("jsonwebtoken");
const secret = "blogManagement";


    module.exports.createAccessToken = (user) => {
    const data = {
        id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin
    };
    console.log("Creating token with data: ", data); 
    return jwt.sign(data, secret, {});
};

    /*module.exports.verify = (req, res, next) => {
    console.log(req.headers.authorization);

    let token = req.headers.authorization;
    if (typeof token === "undefined") {
        return res.send({ auth: "Failed. No Token" });
    } else {
        token = token.slice(7, token.length);
        jwt.verify(token, secret, function(err, decodedToken) {
            if (err) {
                return res.send({
                    auth: "Failed",
                    message: err.message
                });
            } else {
                req.user = decodedToken;
                console.log(req.user);
                next();
            }
        });
    }
};
*/

module.exports.verify = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.slice(7) : undefined;

    // If no token is provided, proceed without blocking the request
    if (!token) {
        console.log("No token provided, proceeding as unauthenticated user.");
        return next();
    }

    // If a token is provided, verify it
    jwt.verify(token, secret, (err, decodedToken) => {
        if (err) {
            console.log("Token verification failed:", err.message);
            // Proceed as unauthenticated user if token is invalid
            return next();
        }

        // If the token is valid, set req.user
        req.user = decodedToken;
        console.log("Authenticated user:", req.user);
        next();
    });
};


    module.exports.verifyAdmin = (req, res, next) => {
    if(req.user.isAdmin){
        next();
    } else {
        return res.status(403).send({
            auth: "Failed",
            message: "Action Forbidden"
        })
    }
}