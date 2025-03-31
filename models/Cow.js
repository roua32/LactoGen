const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CowSchema = new Schema(
  {
    RefNum: {
      type: String,
      required: true,
    },
    birthDate: Date,

    breed: String,

    motherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cows",
    }, // Suivi généalogique

    healthStatus: String,

    medicalHistory: [{ date: Date, details: String }],

    reproductionCycle: [{ date: Date, status: String }], // Cycle de reproduction
  },
  { timestamps: true }
);

module.exports = Cow = mongoose.model("cows", CowSchema);
