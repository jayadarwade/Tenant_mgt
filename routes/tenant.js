const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const upload = require(".././config/upload");
// Load User model
const User = require("../models/User");
const Tenant = require("../models/tenant.model");
const Rent = require("../models/rent.model");
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
    if (req.files && req.files.profilePhoto && req.files.idProof) {
        req.body.profilePhoto = req.files.profilePhoto[0].filename;
        req.body.idProof = req.files.idProof[0].filename;
        req.body.addressProof = req.files.addressProof[0].filename;
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
    res.render("tenantDetails.ejs", {
        att: await Tenant.findOne({ _id: id, deletedDate:null }),
        baseUrl: process.env.baseUrl
    });
});

router.get("/edit/:id", async (req, res) => {
    let id = req.params.id;
    res.render("tenantEdit.ejs", {
        att: await Tenant.findOne({ _id: id, deletedDate:null }),
    });
});

router.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;
    await Tenant.updateOne({ _id: id }, { $set: { deletedDate: new Date() } });
    return res.status(200).send({
        success: true,
        messagge: "",
        data: null
    })
    // res.render("tenantEdit.ejs", {
    //     att: await Tenant.findOne({ _id: id }),
    // });
});

router.get("/rent/:tenantId", async (req, res) => {
    const tenantId = req.params.tenantId;

    // Get the last rent payment month for the tenant
    let lastPayMonth = await Rent.findOne({ tenantId }).sort({ createdDate: -1 });
    let month = lastPayMonth ? lastPayMonth.rentPayMonth : null;

    // Render the `rent.ejs` view with the fetched data
    res.render("rent.ejs", {
        data: await Rent.find({ tenantId }),
        month: month,
        tenantData: await Tenant.findOne({ _id: tenantId }),
    });
});


router.post("/addRent", async (req, res) => {
    await Rent.create(req.body);
    res.redirect(`/tenant/rent/${req.body.tenantId}`);
});

module.exports = router;
