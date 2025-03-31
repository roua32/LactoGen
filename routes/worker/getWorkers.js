const Worker = require("../../models/Worker");
const mongoose = require("mongoose");
module.exports = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).send(workers);
  } catch (error) {
    res.status(500).send({ message: "Error fetching workers" });
  }
};
