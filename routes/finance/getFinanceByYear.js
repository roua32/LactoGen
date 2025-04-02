const Finance = require("../../models/Finance");

module.exports = async (req, res) => {
  try {
    // Extracting the year parameter from the request
    const { year } = req.params;
    const y = parseInt(year);

    // Input validation:
    // - Year should be a valid number and within a reasonable range (1900 to current year)
    if (!y || y < 1900 || y > new Date().getFullYear()) {
      return res.status(400).json({ message: "Invalid year" });
    }

    // Defining Date Range:
    // - startDate: January 1st of the given year
    // - endDate: January 1st of the following year (exclusive)
    // Example for 2024:
    //   startDate = new Date(2024, 0, 1) → 2024-01-01
    //   endDate = new Date(2025, 0, 1) → 2025-01-01
    const startDate = new Date(y, 0, 1);
    const endDate = new Date(y + 1, 0, 1);

    // Query the database for all finance records within the given year
    const finances = await Finance.find({
      date: { $gte: startDate, $lt: endDate },
    });

    // If no records are found, return a 404 response
    if (finances.length === 0) {
      return res
        .status(404)
        .json({ message: "No finance records found for this year" });
    }

    // Initialize total amounts
    let totalIncome = 0;
    let totalExpense = 0;

    // Loop through finance records to calculate total income and expenses
    finances.forEach((record) => {
      if (record.type === "income") {
        totalIncome += record.amount;
      } else if (record.type === "expense") {
        totalExpense += record.amount;
      }
    });

    // Calculate the bilan (balance) = total income - total expense
    const bilan = totalIncome - totalExpense;

    // Sending the response with detailed financial data
    res.status(200).json({
      finances, // List of all transactions
      totalIncome, // Total income for the year
      totalExpense, // Total expenses for the year
      bilan, // Financial balance (income - expenses)
      message: `Your income for this year is ${totalIncome}, your expense is ${totalExpense}, and your balance (bilan) is ${bilan}.`,
    });
  } catch (error) {
    console.error("Error fetching finances by year:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
