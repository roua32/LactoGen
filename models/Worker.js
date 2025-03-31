const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkerSchema = new Schema(
  {
    WorkerFullName: {
      type: String,
      required: true,
    },
    WorkerPhone: {
      type: String,
      required: true,
    },
    Role: String, // Example: "Milker", "Feeder", "Veterinary Assistant"
    Salary: Number,
    attendance: [{ date: Date, present: Boolean }],
    tasks: [
      {
        task: String, // Example: "Milk cows", "Clean barn", "Feed calves"
        status: { type: String, default: "pending" }, // "pending", "completed"
        dueDate: Date, // Date when the task should be done
        reminderDate: Date, // Date to send a reminder
      },
    ],
    workHours: { type: Number, default: 8 }, // Hours worked per day
    shift: {
      type: String,
      enum: ["morning", "afternoon", "night"],
      default: "morning",
    }, // Work shifts
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = Worker = mongoose.model("workers", WorkerSchema);
