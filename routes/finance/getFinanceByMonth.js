const Finance = require("../../models/Finance");

module.exports = async (req, res) => {
  try {
    // Extracting Parameters
    const { year, month } = req.params;
    const y = parseInt(year);
    const m = parseInt(month);

    // Input Validation :
    // - Year should be a valid number and within a reasonable range (1900 to current year)
    // - Month should be between 1 and 12
    if (!y || y < 1900 || y > new Date().getFullYear()) {
      return res.status(400).json({ message: "Invalid year" });
    }
    if (!m || m < 1 || m > 12) {
      return res.status(400).json({ message: "Invalid month" });
    }

    // Defining Date Range :
    // - Creates a startDate object for the first day of the given month
    // - Creates an endDate object for the first day of the next month (exclusive)
    // Example for 2024-03:
    //   startDate = new Date(2024, 2, 1) → 2024-03-01
    //   endDate = new Date(2024, 3, 1) → 2024-04-01
    const startDate = new Date(y, m - 1, 1);
    const endDate = new Date(y, m, 1);

    // Query the database to get all finance records within the date range
    const finances = await Finance.find({
      date: { $gte: startDate, $lt: endDate },
    });

    // If no records are found, return a 404 response
    if (finances.length === 0) {
      return res
        .status(404)
        .json({ message: "No finance records found for this month" });
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

    // Sending the response
    res.status(200).json({
      finances, // List of all transactions
      totalIncome, // Total income for the month
      totalExpense, // Total expenses for the month
      bilan, // Financial balance (income - expenses)
      message: `Your income for this month is ${totalIncome}, your expense is ${totalExpense}, and your balance (bilan) is ${bilan}.`,
    });
  } catch (error) {
    console.error("Error fetching finances by month:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
