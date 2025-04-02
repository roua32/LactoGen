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

//Get Cows by Breed
route.get("/getCowsByBreed/:breed", require("./getCowsByBreed"));

//Get All Calves of a Specific Cow
route.get("/getCalvesOfCow/:id", require("./getCalvesOfCow"));

//get All Cows Born in a Certain Year
route.get("/getCowsByYear/:year", require("./getCowsByYear"));

//Get Cows with a Specific Health Status
route.get("/getCowsByHealthStatus/:status", require("./getCowByHealthStatus"));

//Get Cows with a Specific Reproduction Status
route.get("/getCowsByReproductionStatus/:status", require("./getCowByReproductionStatus"))

//get Cows That Had Fertilization Attempts
route.get ("/getCowsWithFertilizationAttempts", require ("./getCowsWithFertilizationAttempts"))

module.exports = route;
