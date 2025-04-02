const Cow = require("../../models/Cow");

module.exports = async (req, res) => {
  try {
    const { status } = req.params;

    // Find all cows matching the given health status
    const cows = await Cow.find({ healthStatus: status });

    if (cows.length === 0) {
      return res.status(404).json({ message: "No cows found with this health status" });
    }

    res.status(200).json(cows);
  } catch (error) {
    console.error("Error fetching cows by health status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};