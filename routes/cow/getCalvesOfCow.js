const Cow = require("../../models/Cow");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the cow by ID to ensure it exists
    const motherCow = await Cow.findById(id);
    if (!motherCow) {
      return res.status(404).json({ message: "Mother cow not found" });
    }

    // Find all cows where the motherId matches the given id
    const calves = await Cow.find({ motherId: id });

    if (calves.length === 0) {
      return res.status(404).json({ message: "No calves found for this cow" });
    }

    res.status(200).json(calves);
  } catch (error) {
    console.error("Error fetching calves:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
