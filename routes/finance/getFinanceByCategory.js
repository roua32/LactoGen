const Finance = require("../../models/Finance");

module.exports = async (req, res) => {
  try {
    const { category } = req.params;

    // Find all finance records that match the given category
    const finances = await Finance.find({ category });

    if (finances.length === 0) {
      return res
        .status(404)
        .json({ message: "No finance records found for this category" });
    }

    // Calculate total amount
    const totalAmount = finances.reduce((sum, record) => sum + record.amount, 0);

    // Send response with total amount
    res.status(200).json({ finances, totalAmount });
  } catch (error) {
    console.error("Error fetching finances by category:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};