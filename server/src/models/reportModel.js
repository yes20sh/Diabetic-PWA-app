// Example for models/reportModel.js
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  fastingTest: { type: Number, required: true },
  fastingTime: { type: String, required: true },
  fastingStatus: { type: String, required: true },
  afterLunchTest: { type: Number },
  afterLunchTime: { type: String },
  afterLunchStatus: { type: String }
}, { timestamps: true });

const Report = mongoose.model('Report', reportSchema);
export default Report;
