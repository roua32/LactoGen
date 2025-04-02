const Finance = require("../../models/Finance");

module.exports = async (req, res) => {
    try {
      // Extracting parameters from the request
      const { category, year, month } = req.params;
      const y = parseInt(year);
      const m = parseInt(month);
  
      // Input validation:
      if (!y || y < 1900 || y > new Date().getFullYear()) {
        return res.status(400).json({ message: "Invalid year" });
      }
      if (!m || m < 1 || m > 12) {
        return res.status(400).json({ message: "Invalid month" });
      }
  
      // Defining Date Range:
      const startDate = new Date(y, m - 1, 1);
      const endDate = new Date(y, m, 1);
  
      // Query the database for finance records within the given category and month
      const finances = await Finance.find({
        category,
        date: { $gte: startDate, $lt: endDate },
      });
  
      // If no records are found, return 0 as the total amount
      if (finances.length === 0) {
        return res.status(200).json({ totalAmount: 0 });
      }
  
      // Calculate the total amount (sum of all amounts)
      const totalAmount = finances.reduce((sum, record) => sum + record.amount, 0);
  
      // Sending the response with only the total amount
      res.status(200).json({finances, totalAmount });
    } catch (error) {
      console.error("Error fetching finances by category and month:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };