const Cow = require("../../models/Cow");

module.exports = async (req, res) => {
  try {
    const {
      RefNum,
      birthDate,
      breed,
      sex,  
      fatherId,
      fatherBreed,
      motherId,
      motherBreed,
      healthStatus,
      medicalHistory,
      reproductionCycle,
      deliveryRecords,
      childrenIds,
    } = req.body;

    //  Validate required fields
    if (!RefNum || !birthDate || !breed || !sex) {
      return res.status(400).json({ message: "RefNum, birthDate, breed, and sex are required" });
    }

    //  Ensure the 'sex' field has a valid value
    if (!["male", "female"].includes(sex)) {
      return res.status(400).json({ message: "Sex must be either 'male' or 'female'" });
    }

    //  Check if RefNum already exists
    const existingCow = await Cow.findOne({ RefNum });
    if (existingCow) {
      return res.status(400).json({ message: "Cow with this RefNum already exists" });
    }

    //  Create new cow instance
    const cow = new Cow({
      RefNum,
      birthDate,
      breed,
      sex,  
      fatherId,
      fatherBreed,
      motherId,
      motherBreed,
      healthStatus,
      medicalHistory,
      reproductionCycle,
      deliveryRecords,
      childrenIds,
    });

    // Save to database
    await cow.save();
    res.status(201).json({ message: "Cow added successfully", cow });
  } catch (error) {
    console.error("Error adding cow:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
