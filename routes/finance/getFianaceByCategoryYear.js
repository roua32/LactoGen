const Finance = require("../../models/Finance");

module.exports = async (req, res) => {
  try {
    // Extracting parameters from the request
    const { category, year } = req.params;
    const y = parseInt(year);

    // Input validation:
    if (!y || y < 1900 || y > new Date().getFullYear()) {
      return res.status(400).json({ message: "Invalid year" });
    }

    // Defining Date Range:
    const startDate = new Date(y, 0, 1); // January 1st of the given year
    const endDate = new Date(y + 1, 0, 1); // January 1st of the following year (exclusive)

    // Query the database for finance records within the given category and year
    const finances = await Finance.find({
      category,
      date: { $gte: startDate, $lt: endDate },
    });

    // Calculate the total amount (sum of all amounts)
    const totalAmount = finances.reduce(
      (sum, record) => sum + record.amount,
      0
    );

    // Sending the response with total amount
    res.status(200).json({ finances, totalAmount });
  } catch (error) {
    console.error("Error fetching finances by category and year:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
