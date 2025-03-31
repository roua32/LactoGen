const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FINANCE_TYPES = ["expense", "income"];

const FinanceSchema = new Schema(
  {
    type: {
      type: String,
      enum: FINANCE_TYPES,
      required: true,
    },
    category: {
      type: String, // Ex: salaire, médicaments, vente de lait…
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0, // Ensure non-negative values
    },
    date: {
      type: Date,
      default: Date.now, // Set default to current date
      required: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt fields
);

module.exports = Finance = mongoose.model("finances", FinanceSchema);
