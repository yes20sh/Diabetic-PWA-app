import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  fastingTest: { type: Number },
  fastingTime: { type: String },
  fastingStatus: { type: String },
  afterLunchTest: { type: Number },
  afterLunchTime: { type: String },
  afterLunchStatus: { type: String }
}, { timestamps: true });

export default mongoose.model('Report', reportSchema);
