const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tenantSchema = new mongoose.Schema({
    name: {
        type: String
        // required: true,
    },
    dob: {
        type: String,
        default: null,
    },
    profession: {
        type: String
    },
    joinDate: {
        type: String,
        default: null,
    },
    rent: {
        type: Number,
    },
    roomNo: {
        type: String
    },
    status: {
        type: String,
        default: "active"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
});

const TenantSchema = mongoose.model("tenants", tenantSchema);

module.exports = TenantSchema;