const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  list: {
    type: String,
    required: true,
  },
  card: {
    type: Array,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("List", listSchema);
