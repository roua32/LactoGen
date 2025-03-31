const Worker = require("../../models/Worker");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      WorkerFullName,
      WorkerPhone,
      Role,
      Salary,
      attendance,
      tasks,
      workHours,
      shift,
    } = req.body;
    // validate objectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid Id" });
    }
    //Find and update the worker by ID
    const updatedWorker = await Worker.findByIdAndUpdate(
      id,
      {
        WorkerFullName,
        WorkerPhone,
        Role,
        Salary,
        attendance,
        tasks,
        workHours,
        shift,
      },
      {
        new: true,
        //Return the updated document
      }
    );
    if (!updatedWorker) {
      res.status(404).json({ message: "Worker not found" });
    }
    res
      .status(200)
      .json({ message: "Worker updated successfully", updatedWorker });
  } catch (error) {
    console.log("Error updating worker:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
