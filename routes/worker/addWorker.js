const Worker = require("../../models/Worker");
module.exports = async (req, res) => {
  try {
    const { WorkerFullName, WorkerPhone, Role, Salary, attendance, tasks,workHours,shift } =
      req.body;

    // Check if a worker with the same full name already exists
    const existingWorker = await Worker.findOne({
      $or: [{ WorkerFullName }, { WorkerPhone }],
    });

    if (existingWorker) {
      res
        .status(400)
        .json({ message: "Worker with this name already exists!" });
    }

    // Create a new worker instance
    const newWorker = new Worker({
      WorkerFullName,
      WorkerPhone,
      Role,
      Salary,
      attendance,
        tasks,
        workHours,
        shift
    });

    // Save to the database
    await newWorker.save();

    // Respond with success
    res
      .status(201)
      .json({ message: "Worker added successfully!", worker: newWorker });
  } catch (error) {
    // Handle errors
    console.error("Error adding worker:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
