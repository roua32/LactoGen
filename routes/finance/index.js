const express = require("express");
const route = express.Router();

// Add a new finance record
route.post("/addFinance", require("./addFinance"));

// Get all finance records
route.get("/getFinances", require("./getFinances"));

//Get a finance record by ID
route.get("/getFinance/:id", require("./getFinance"));

// Get finance records by category + total amount for all years
route.get("/getFinanceByCategory/:category", require("./getFinanceByCategory"));

// Get finance by type + total amount for all years
route.get("/getFinanceByType/:type", require("./getFinanceByType"));

// Get finace by month (expense and income and balance)
route.get("/getFinanceByMonth/:year/:month", require("./getFinanceByMonth"));

// Get finace by year (expense and income and balance)
route.get("/getFinanceByYear/:year", require("./getFinanceByYear"));

// Get finance by category per month (+ total amount)
route.get(
  "/getFianaceByCategoryMonth/:category/:year/:month",
  require("./getFinanceByCategoryMonth")
);

// Get finance by category per year (+ total amount)
route.get(
  "/getFianaceByCategoryYear/:category/:year",
  require("./getFianaceByCategoryYear")
);




// Update a finance record by ID
// Delete a finance record by ID
// Delete all finances

module.exports = route;
