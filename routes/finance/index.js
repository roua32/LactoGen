const express = require("express");
const route = express.Router();

// Add a new finance record
route.post("/addFinance", require("./addFinance"));
// Get all finance records
route.get("/getFinances", require("./getFinances"));
//Get a finance record by ID
route.get("/getFinance/:id", require("./getFinance"));
// Get finance records by category
route.get("/getFinanceByCategory/:category", require("./getFinanceByCategory"));
// Get finance by type
route.get("/getFinanceByType/:type", require("./getFinanceByType"));

// Get finace by month
// ✅ Find finance by month and year
// ✅ Get total amount per type (income/expense) for a month
// get total amount per category
// Update a finance record by ID
// Delete a finance record by ID
// Delete all finances

module.exports = route;
