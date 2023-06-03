const list = require('../mockData/reviews.json');
const Review = require('../models/Review');

async function populateDB() {
  await Review.deleteMany();
  for (const obj of list) {
    await Review.create(obj);
  }
}

module.exports = populateDB;