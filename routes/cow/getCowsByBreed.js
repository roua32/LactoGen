const Cow = require("../../models/Cow");

module.exports = async (req, res) => {
  try {
    const { breed } = req.params;

    // Find cows that match the given breed
    const cows = await Cow.find({ breed });

    if (cows.length === 0) {
      return res.status(404).json({ message: "No cows found for this breed" });
    }

    res.status(200).json(cows);
  } catch (error) {
    console.log("Error fetching cows by breed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
