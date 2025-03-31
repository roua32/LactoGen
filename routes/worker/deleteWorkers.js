const Worker = require("../../models/Worker");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    // Delete all workers in the collection
    const result = await Worker.deleteMany({});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No worker to delete" });
    }

    res
      .status(200)
      .json({ message: `${result.deletedCount} workers deleted successfully` });
  } catch (error) {
    console.log("Error deleting workers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
