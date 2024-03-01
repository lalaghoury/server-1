const mongoose = require("mongoose");

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateSubscribed: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const newsletterModel = mongoose.model("Newsletter", newsletterSchema);

module.exports = newsletterModel;
