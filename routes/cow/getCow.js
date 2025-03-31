const Cow = require("../../models/Cow");


module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const cow = await Cow.findById(id); 
    if (!cow) {
      return res.status(404).json({ message: "Cow not found" });
    }
    res.status(200).json(cow);
  } catch (error) {
    console.log("Error fetching cow:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
