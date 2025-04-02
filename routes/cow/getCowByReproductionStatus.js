const Cow = require("../../models/Cow");

module.exports = async (req, res) => {
  try {
    const { status } = req.params;

    // Validate input
    if (!["successful", "failed"].includes(status)) {
      return res.status(400).json({ message: "Invalid reproduction status" });
    }

    // Find cows that have reproduction attempts with the given status
    const cows = await Cow.find({
      "reproductionCycle.result": status
    });

    if (cows.length === 0) {
      return res.status(404).json({ message: "No cows found with this reproduction status" });
    }

    res.status(200).json(cows);
  } catch (error) {
    console.error("Error fetching cows by reproduction status:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};