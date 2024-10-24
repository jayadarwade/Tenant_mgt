const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const Tenant = require("../models/tenant.model");


// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("login"));

// Dashboard
// router.get("/dashboard", ensureAuthenticated,async (req, res) =>
//   res.render("tenantList.ejs", {
//     vin: await Tenant.find()
//   })
// );

router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  // Set the default page and limit values
  const page = parseInt(req.query.page) || 1; // Get current page from query params, default to 1
  const limit = parseInt(req.query.limit) || 5; // Set limit of records per page

  try {
    // Calculate the number of documents to skip for pagination
    const skip = (page - 1) * limit;

    // Find tenants with pagination
    const tenants = await Tenant.find().skip(skip).limit(limit);

    // Count total documents
    const totalTenants = await Tenant.countDocuments();

    // Calculate total number of pages
    const totalPages = Math.ceil(totalTenants / limit);

    return res.render("tenantList.ejs", {
      vin: tenants,  // Pass the paginated tenants
      currentPage: page,  // Pass the current page
      totalPages: totalPages,  // Pass total pages
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;


