const Finance = require("../../models/Finance");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const finances = await Finance.find();
    res.status(200).send(finances);
  } catch (error) {
    res.status(500).send({ message: "Error fetching Finances" });
  }
};
