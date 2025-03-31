const express = require("express");
const route = express.Router();

// Add a new worker
route.post("/addWorker", require("./addWorker"));
//Get all workers
route.get("/getWorkers", require("./getWorkers"));
//Get a worker by ID
route.get("/getWorker/:id", require("./getWorker"))
//Get a worker by name
route.get("/getWorkerbyname/:name", require("./getWorkerbyname"))
//Update a worker by ID
route.patch("/updateworker/:id", require("./updateWorker"))
//Delete a worker by ID
route.delete("/deleteWorker/:id", require ("./deleteWorker"))
//Delete all workers
route.delete("/deleteWorkers", require("./deleteWorkers"))
module.exports = route;
