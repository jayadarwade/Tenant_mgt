const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tenantSchema = new mongoose.Schema({
    name: {
        type: String
    },
    profilePhoto: {
        type: String
    },
    idProof: {
        type: String
    },
    addressProof: {
        type: String
    },
    dob: {
        type: String,
        default: null,
    },
    profession: {
        type: String,
        enum: ['student', 'employee'],
        default: "student"
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
    depositeAmount: {
        type: String
    },
    depositeStatus: {
        type: String,
        enum: ['paid', 'unpaid'],
        default: "paid"
    },
    phoneNumber: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: "active"
    },
    deletedDate: {
        type: Date,
        default: null
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