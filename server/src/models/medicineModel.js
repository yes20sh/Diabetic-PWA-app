import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Link to user
  name: { type: String, required: true },
  type: { type: String, required: true },
  dosage: { type: String, required: true },
  notification: { type: Boolean, default: false },
  time: { type: String }
}, { timestamps: true });

const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;
