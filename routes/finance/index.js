const express = require("express");
const route = express.Router();

// Add a new finance record
route.post("/addFinance", require("./addFinance"));

// Get all finance records

//Get a finance record by ID

// Get finance records by category
//



module.exports = route;
