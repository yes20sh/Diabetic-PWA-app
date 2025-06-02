import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  dosage: { type: String, required: true },
  notification: { type: Boolean, default: false },
  time: {
    type: String,
    required: true,
    match: /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i,
  }
});

const Medicine = mongoose.model('Medicine', medicineSchema);
export default Medicine;
