import mongoose from 'mongoose'

const ApplicationSchema = new mongoose.Schema({
  candidateID: {
    type: mongoose.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  jobID: {
    type: mongoose.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  show: {
    type: Boolean,
    default: true,
  }
});

ApplicationSchema.index({
  candidateID: 1,
  jobID: 1,
}, {
  unique: true,
});

const Application = mongoose.model('Application', ApplicationSchema);

export default Application;