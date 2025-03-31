const Cow = require("../../models/Cow");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    // validate objectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID" });
    }
    //Find and delete the cow by ID
    const deletedCow = await Cow.findByIdAndDelete(id);
    if (!deletedCow) {
      res.status(404).json({ message: "Cow not found" });
    }
    res.status(200).json({ message: "Cow deleted successfully" });
  } catch (error) {
    console.log("Error deleting cow:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
