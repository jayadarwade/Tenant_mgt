const jwt = require("jsonwebtoken");
const User =require("../models/User");

exports.validateCustomer = async (req) => {
    const userToken = req.headers.authorization;
    const token = userToken.split(" ");
    const decoded = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET,);

    //Check if User exists with the same number
    let user = await User.findOne({email: decoded.user});
    return user;
};

exports.validateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
        if (token == null) res.status(400).send({
            message: "Token not present",
            success: false,
            data: {}
        });
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                res.status(403).send({
                    message: "Token invalid",
                    success: false,
                    data: {}
                });
            } else {
                req.user = user;
                next() //proceed to the next action in the calling function
            }
        }) //end of jwt.verify()
    } else {
        res.status(400).send({
            message: "Token not present",
            success: false,
            data: {}
        });
    }
};