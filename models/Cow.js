const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CowSchema = new Schema(
  {
    RefNum: {
      type: String,
      required: true,
      unique: true,
    },

    birthDate: {
      type: Date,
      required: true,
    },

    breed: {
      type: String,
      required: true,
    },

    fatherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cows",
    }, // Father of the cow

    fatherBreed: {
      type: String,
    }, // Father's breed

    motherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cows",
    }, // Mother of the cow

    motherBreed: {
      type: String,
    }, // Mother's breed

    sex: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    healthStatus: {
      type: String,
      enum: [
        "Healthy",
        "Sick",
        "Injured",
        "Pregnant",
        "In Labor",
        "Recovering",
        "Quarantined",
        "Under Treatment",
        "Malnourished",
        "Deceased",
      ],
      default: "Healthy",
    },

    medicalHistory: [
      {
        date: { type: Date, default: Date.now },
        details: { type: String, required: true },
      },
    ], // Medical records

    reproductionCycle: [
      {
        attemptDate: { type: Date, required: true },
        method: {
          type: String,
          enum: ["natural", "artificial"],
          required: true,
        },
        result: {
          type: String,
          enum: ["successful", "failed"],
          required: true,
        },
        notes: String,
      },
    ], // Detailed reproduction cycle

    deliveryRecords: [
      {
        birthDate: { type: Date, required: true },
        calfId: { type: mongoose.Schema.Types.ObjectId, ref: "cows" },
        sex: { type: String, enum: ["male", "female"], required: true },
        breed: { type: String, required: true }, // Breed of the newborn
      },
    ], // Delivery history for mother cows
    childrenIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cows",
      },
    ], // Offspring of the cow
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cow", CowSchema);
