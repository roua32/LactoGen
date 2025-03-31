const Cow = require("../../models/Cow");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
    try {
      const cows = await Cow.find();  
      res.status(200).send(cows);
    } catch (error) {
      res.status(500).send({ message: "Error fetching cows" });
    }
  }
