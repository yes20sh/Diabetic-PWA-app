import Medicine from '../models/medicineModel.js';

function isValidTimeFormat(time) {
  return /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(time);
}

export const createMedicine = async (req, res) => {
  try {
    const { name, type, dosage, notification, time } = req.body;
    if (!isValidTimeFormat(time)) {
      return res.status(400).json({ error: 'Time must be in "hh:mm AM/PM" format, e.g., "08:00 AM"' });
    }
    const medicine = new Medicine({ name, type, dosage, notification, time });
    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMedicine = async (req, res) => {
  try {
    const { name, type, dosage, notification, time } = req.body;
    if (time && !isValidTimeFormat(time)) {
      return res.status(400).json({ error: 'Time must be in "hh:mm AM/PM" format, e.g., "08:00 AM"' });
    }
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, type, dosage, notification, time },
      { new: true, runValidators: true }
    );
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json(medicine);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) return res.status(404).json({ error: 'Medicine not found' });
    res.json({ message: 'Medicine deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
