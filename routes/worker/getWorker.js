const Worker = require("../../models/Worker");


module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const worker = await Worker.findById(id); 
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }
    res.status(200).json(worker);
  } catch (error) {
    console.log("Error fetching worker:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
