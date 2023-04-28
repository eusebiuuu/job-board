const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  companyID: {
    type: mongoose.Types.ObjectId,
    ref: 'Company',
    required: true,
  },
  candidateID: {
    type: mongoose.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  }
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;