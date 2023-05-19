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
    validate: [val => {
      return val >= 1 && val <= 5;
    }, 'Rating must be a value between 1 and 5'],
  }
});

ReviewSchema.statics.calculateAverageRating = async function (companyID) {
  const result = await this.aggregate([
    {
      $match: {
        companyID: companyID
      }
    }, {
      $group: {
        _id: null,
        averageRating: {
          $avg: '$rating'
        },
        numOfReviews: {
          $sum: 1
        },
      },
    },
  ]);

  try {
    await this.model('Company').findOneAndUpdate(
      {
        _id: companyID,
      }, {
        averageRating: result[0]?.averageRating || 0,
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post('save', async function () {
  await this.constructor.calculateAverageRating(this.companyID);
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;