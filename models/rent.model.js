const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const rentSchema = new mongoose.Schema({
    tenantId: {
        type: String
    },
    note: {
        type: String
    },
    status: {
        type: String
    },
    roomNo: {
        type: String
    },
    paymentMode: {
        type: String,
        default: null,
    },
    paidAmount: {
        type: String
    },
    rentPayMonth: {
        type: String,
        default: null,
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

const RentSchema = mongoose.model("rents", rentSchema);

module.exports = RentSchema;