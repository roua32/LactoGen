const Cow = require("../../models/Cow");
module.exports = async (req, res) => {
  try {
    const {
      RefNum,
      birthDate,
      breed,
      motherId,
      healthStatus,
      medicalHistory,
      reproductionCycle,
    } = req.body;

    // Check if RefNum is provided
    if (!RefNum) {
      return res.status(400).json({ message: "RefNum is required" });
    }

    // Check if RefNum already exists
    const existingCow = await Cow.findOne({ RefNum });
    if (existingCow) {
      return res
        .status(400)
        .json({ message: "Cow with this RefNum already exists" });
    }

    // Create new cow instance
    const cow = new Cow({
      RefNum,
      birthDate,
      breed,
      motherId,
      healthStatus,
      medicalHistory,
      reproductionCycle,
    });

    // Save to database
    await cow.save();
    res.status(201).json({ message: "Cow added successfully", cow });
  } catch (error) {
    console.error("Error adding cow:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
