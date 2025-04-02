const Finance = require("../../models/Finance");

module.exports = async (req, res) => {
  try {
    const { type } = req.params;

    // Fetch finances by type
    const finances = await Finance.find({ type });

    if (finances.length === 0) {
      return res.status(404).json({ message: `No ${type} records found.` });
    }

    // Calculate total amount
    const totalAmount = finances.reduce(
      (sum, record) => sum + record.amount,
      0
    );

    // Send response with total amount
    res.status(200).json({ finances, totalAmount });
  } catch (error) {
    console.error(`Error fetching finances by type (${type}):`, error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
