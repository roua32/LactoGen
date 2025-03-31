const Finance = require("../../models/Finance");

module.exports = async (req, res) => {
  try {
    const { type, category, amount, date } = req.body;

    // Create new finance instance
    const finance = new Finance({
      type,
      category,
      amount,
      date,
    });

    // Save to database
    await finance.save();
    res.status(201).json({ message: "Finance added successfully", finance });
  } catch (error) {
    console.error("Error adding finance:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};