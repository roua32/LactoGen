const Worker = require("../../models/Worker");

module.exports = async (req, res) => {
  try {
    const { name } = req.params; // Extract name from request parameters

    const worker = await Worker.findOne({ WorkerFullName: name });

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};