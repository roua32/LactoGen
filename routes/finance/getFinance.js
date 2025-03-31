const Finance = require("../../models/Finance");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const finance = await Finance.findById(id);
    if (!finance) {
      return res.status(404).json({ message: "finance not found" });
    }
    res.status(200).json(finance);
  } catch (error) {
    console.log("Error fetching finance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
