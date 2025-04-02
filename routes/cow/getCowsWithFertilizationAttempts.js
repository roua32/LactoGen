const Cow = require("../../models/Cow");

module.exports = async (req, res) => {
  try {
    const cows = await Cow.find({ reproductionCycle: { $ne: [] } });
    res.status(200).json(cows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cows", error });
  }
};
