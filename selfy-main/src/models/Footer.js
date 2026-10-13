const mongoose = require("mongoose");

/* =======================
   Footer Schema
======================= */

const linkSchema = new mongoose.Schema(
  {
    label: String,
    url: String,
  },
  { _id: false }
);

const sectionSchema = new mongoose.Schema(
  {
    title: String,
    links: [linkSchema],
  },
  { _id: false }
);

const footerSchema = new mongoose.Schema(
  {
    sections: [sectionSchema],

    address: {
      company: String,
      line1: String,
      line2: String,
      country: String,
    },

    bottomLinks: [linkSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Footer", footerSchema);