const Worker = require("../../models/Worker");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    // validate objectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid ID" });
    }
    //Find and delete the worker by ID
    const deletedWorker = await Worker.findByIdAndDelete(id);
    if (!deletedWorker) {
      res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json({ message: "Worker deleted successfully" });
  } catch (error) {
    console.log("Error deleting worker:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
