const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User SignUP Api
exports.create = async (req, res) => {
    try {
        const accessToken = generateAccessToken({ user: req.body.email });
        const refreshToken = generateRefreshToken({ user: req.body.email });
        let pass = await bcrypt.hash(req.body.password, 10);
        let findUser = await User.findOne({ email: req.body.email });
        if (findUser) {
            return res.status(200).send({
                success: false,
                message: "User alredy exist with this email",
                data: {}
            })
        }
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: pass,
        }).then(result => {
            res.status(200).send({
                success: true,
                message: "SignUp successfully!",
                data: {
                    data: result,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            })
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message + "Sorry your Not signUp!",
                data: {},
            });
        })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message + "Sorry somethink went wrong",
            data: {},
        });
    }

};

// accessTokens
let accessTokens = [];
function generateAccessToken(user) {
    const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30m", }
    );
    accessTokens.push(accessToken);
    return accessToken;
}

// refreshTokens
let refreshTokens = [];
function generateRefreshToken(user) {
    const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1h", }
    );
    refreshTokens.push(refreshToken);
    return refreshToken;
}
//User Login Api
exports.login = async (req, res) => {
    try {
        let findUser = await User.findOne({ email: req.body.email });
        const accessToken = generateAccessToken({ user: req.body.email });
        const refreshToken = generateRefreshToken({ user: req.body.email });
        if (!findUser) {
            return res.status(200).send({
                success: false,
                message: "Sorry your not valid user!",
                data: {}
            })
        } else if (await bcrypt.compare(req.body.password, findUser.password)) {
            res.status(200).send({
                success: true,
                message: "User Login successfully!",
                data: {
                    data: findUser,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }
            })
        } else {
            res.status(200).send({
                success: false,
                message: "Password Invalid!",
                data: {}
            })
        }
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message + "Sorry somethink went wrong!",
            data: {}
        })
    }
};
