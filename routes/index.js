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
  const limit = parseInt(req.query.limit) || 10; // Set limit of records per page

  try {
    // Calculate the number of documents to skip for pagination
    const skip = (page - 1) * limit;

    // Find tenants with pagination
    const tenants = await Tenant.find({ deletedDate: null }).sort({ createdDate: -1 }).skip(skip).limit(limit);

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

router.get("/dashboard/data", ensureAuthenticated, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const tenants = await Tenant.find({ deletedDate: null }).sort({ createdDate: -1 }).skip(skip).limit(limit);

    const totalTenants = await Tenant.countDocuments();
    const formattedData = tenants.map((tenant, index) => ({
      sNo: skip + index + 1,
      name: tenant.name.charAt(0).toUpperCase() + tenant.name.slice(1).toLowerCase(),
      dob: tenant.dob,
      profession: tenant.profession,
      roomNo: tenant.roomNo,
      joinDate: tenant.joinDate,
      rent: tenant.rent,
      status: tenant.status.charAt(0).toUpperCase() + tenant.status.slice(1).toLowerCase(),
      view: `<a href="/tenant/details/${tenant._id}"><button class="viewBtn" style="text-align: center;">View</button></a>`,
      edit: `<a href="/tenant/edit/${tenant._id}"><button class="editBtn">Edit</button></a>`,
      delete: `<button onclick="confirmDelete('${tenant._id}')" class="deleteBtn">Delete</button>`,
      rentHistory: `<a href = "/tenant/rent/${tenant._id}"><button class="rentHistoryBtn">Rent</button></a>`
    }));

    res.json({
      draw: req.query.draw,  // For DataTables to track request counts
      recordsTotal: totalTenants,
      recordsFiltered: totalTenants,
      data: formattedData,
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;


