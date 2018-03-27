const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  homeImage: {
    type: String,
    required: "Can not Empty"
  },
  aboutImage: {
    type: String,
    required: "Can not Empty"
  },
  aboutText: {
    type: String,
    required: "Can not Empty"
  },
  contantImage: {
    type: String,
    required: "Can not Empty"
  },
  contactText: {
    type: String,
    required: "Can not Empty"
  }
});

module.exports = mongoose.model("Site", siteSchema);
