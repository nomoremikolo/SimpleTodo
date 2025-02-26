const { Schema, model } = require("mongoose");

const tokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Token", tokenSchema);
