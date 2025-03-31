const Cow = require("../../models/Cow");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    // Delete all cows in the collection
    const result = await Cow.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No cows to delete" });
    }

    res
      .status(200)
      .json({ message: `${result.deletedCount} cows deleted successfully` });
  } catch (error) {
    console.log("Error deleting cows:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
