const Cow = require("../../models/Cow");

module.exports = async (req, res) => {
  try {
    const { year } = req.params;
    const startDate = new Date(`${year}-01-01T00:00:00.000Z`);
    const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

    const cows = await Cow.find({
      birthDate: { $gte: startDate, $lte: endDate },
    });

    if (cows.length === 0) {
      return res.status(404).json({ message: `No cows found for the year ${year}` });
    }

    res.status(200).json(cows);
  } catch (error) {
    console.error("Error fetching cows by year:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};