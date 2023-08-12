const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({

  username: { type: String, unique: true, required: true },
  email: {
    type: String,
    required: true,
    unique: true
  },
  
  password: { type: String, required: true },

  status: {
    type: String, 
    enum: ['Pending', 'Active'],
    default: 'Pending'
  },
  confirmationCode: { 
    type: String, 
    unique: true },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ],

  resetToken: String,
  resetTokenExpiration: Date,
});

module.exports = mongoose.model("User", userSchema);
