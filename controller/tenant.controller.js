const User = require("../models/User");
const validateToken = require("../config/helper");
const Tanant = require("../models/tenant.model");

exports.create = async (req, res) => {
    try {
        console.log("object 8");

        // const userData = await validateToken.validateCustomer(req);
        // let data = req.body;
        // var user = await User.findOne({ _id: req.body.userId });
        // if (!user) {
        //     return res.status(200).send({
        //         success: false,
        //         message: "user not valid",
        //         data: {}
        //     })
        // }
        if (req.body.id) {
            await vinNumber.updateOne({ id: req.body.id },
                {
                    $set: req.body
                });
            var VINnumber = await vinNumber.findOne({ vinNumber: req.body.vinNumber });
            res.status(200).send({
                success: true,
                message: "vin update",
                data: VINnumber
            })
        } else {
            console.log("req.body ", req.body.namw);

            let result = await Tanant.create(req.body);
            res.status(200).send({
                success: true,
                message: "Tenant added successfully.",
                data: result
            })
        }
    }
    catch (err) {
        console.log("71Add")
        console.log(err)
        res.status(500).send({
            success: false,
            message: err.message + "Somethink went wrong",
            data: {}
        })
    }
};

exports.get = async (req, res) => {
    try {
        var user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(200).send({
                success: false,
                message: "Sorry you are not valid user!",
                data: {}
            })
        }
        await vinNumber.find({ userId: req.params.id })
            .then(data => {
                if (data.length <= 0) {
                    return res.status(200).send({
                        success: false,
                        message: "you dont have vin card",
                        data: {}
                    })
                }
                res.status(200).send({
                    success: true,
                    message: "get all vin Number Card",
                    data: data
                })
            })
            .catch(err => {
                res.status(500).send({
                    success: false,
                    message: err.message + " sorry",
                    data: {}
                })
            })
    }
    catch (err) {
        res.status(500).send({
            success: false,
            message: err.message + " somethink went wrong",
            data: {}
        })
    }
};
