const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const upload = require(".././config/upload");
// Load User model
const User = require("../models/User");
const Tenant = require("../models/tenant.model");

const { forwardAuthenticated } = require("../config/auth");

// const https = require("https");
// const passport = require("passport");
// const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");


// router.get("/", forwardAuthenticated, (req, res) => res.render(passport.authenticate("local", {
//     successRedirect: "/dashboard",
//     failureRedirect: "/login",
//     failureFlash: true,
// })(req, res)));

//Add Screen
router.get("/", (req, res) => {
    return res.render("tenantAdd")
});

// Add 
router.post("/add", upload.uploadImage, async (req, res) => {
    if (req.files.length>0) {
        req.body.profilePhoto = req.files.profilePhoto[0].filename;
        req.body.idProof = req.files.idProof[0].filename;
    }
    if (req.body.id) {
        await Tenant.updateOne({ _id: req.body.id }, req.body);

    } else {
        await Tenant.create(req.body);
    }
    req.flash(
        "success_msg",
        "Tenant added successfully"
    );
    return res.redirect('/dashboard')
});

router.get("/details/:id", async (req, res) => {
    let id = req.params.id;
    res.render("vinDetails.ejs", {
        att: await Tenant.findOne({ _id: id }),
    });
});


router.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    res.render("vinEdit.ejs", {
        att: await Tenant.findOne({ _id: id }),
    });
});

router.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    await Tenant.deleteOne({ _id: id });
    return res.status(200).send({
        success: true,
        messagge: "",
        data: null
    })
    // res.render("vinEdit.ejs", {
    //     att: await Tenant.findOne({ _id: id }),
    // });
});

module.exports = router;
