const express = require("express");
const route = express.Router();

// Add a new cow
route.post("/addCow", require("./addCow"));

//Get all cows
route.get("/getCows", require("./getCows"));

//Get a cow by ID
route.get("/getCow/:id", require("./getCow"));

//Update a cow by ID check google docs remarque
route.patch("/updateCow/:id", require("./updateCow"));

//Delete a cow by ID
route.delete("/deleteCow/:id", require("./deleteCow"));

//Delete all cows
route.delete("/deleteCows", require("./deleteCows"));
module.exports = route;
