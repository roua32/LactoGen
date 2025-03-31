const Cow = require("../../models/Cow");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      RefNum,
      birthDate,
      breed,
      motherId,
      healthStatus,
      medicalHistory,
      reproductionCycle,
    } = req.body;
    // validate objectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid Id" });
    }
    //Find and update the cow by ID
    const updatedCow = await Cow.findByIdAndUpdate(
      id,
      {
        RefNum,
        birthDate,
        breed,
        motherId,
        healthStatus,
        medicalHistory,
        reproductionCycle,
      },
      {
        new: true,
        //Return the updated document
      }
    );
    if (!updatedCow) {
      res.status(404).json({ message: "Cow not found" });
    }
    res.status(200).json({ message: "Cow updated successfully", updatedCow });
  } catch (error) {
    console.log("Error updating cow:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
