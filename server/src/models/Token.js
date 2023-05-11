const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
  ip: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Types.ObjectId,
    references: { type: [mongoose.Types.ObjectId], refPath: 'model_type' },
    model_type: {  type: String, enum: ['Candidate', 'Company'], required: true },
    required: true,
  }
}, {
  timestamps: true,
});

const Token = mongoose.model('Token', TokenSchema);

module.exports = Token;