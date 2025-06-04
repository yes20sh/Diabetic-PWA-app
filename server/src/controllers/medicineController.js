import Medicine from '../models/medicineModel.js';

// Convert "HH:mm" (24-hour) to "hh:mm AM/PM"
function formatTo12HourClock(time) {
  if (!time) return '';
  if (!/^\d{2}:\d{2}$/.test(time)) return '';
  const [hourStr, minute] = time.split(':');
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12;
  return `${hour.toString().padStart(2, '0')}:${minute} ${ampm}`;
}

// Validate "hh:mm AM/PM"
function isValidTimeFormat(time) {
  if (!time) return true; // Allow empty time
  return /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i.test(time);
}

// Helper to check user authentication and return userId or send error response
function checkAuth(req, res) {
  if (!req.user?.id) {
    res.status(401).json({ error: 'User not authenticated' });
    return null;
  }
  return req.user.id;
}

// CREATE
export const createMedicine = async (req, res) => {
  try {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { name, type, dosage, notification = false, time = '' } = req.body;

    if (!name || !type || !dosage) {
      return res.status(400).json({ error: 'Name, type, and dosage are required.' });
    }

    const formattedTime = formatTo12HourClock(time);
    if (time && !formattedTime) {
      return res.status(400).json({ error: 'Invalid time format. Use "HH:mm" 24-hour format.' });
    }

    if (!isValidTimeFormat(formattedTime)) {
      return res.status(400).json({ error: 'Time must be in "hh:mm AM/PM" format, e.g., "08:00 AM"' });
    }

    const medicine = new Medicine({
      user: userId,
      name: name.trim(),
      type: type.trim(),
      dosage: dosage.trim(),
      notification,
      time: formattedTime,
    });

    await medicine.save();
    res.status(201).json({ message: 'Medicine created successfully', medicine });
  } catch (error) {
    console.error('Create medicine error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET ALL (for logged-in user)
export const getAllMedicines = async (req, res) => {
  try {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const medicines = await Medicine.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(medicines);
  } catch (error) {
    console.error('Get all medicines error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET BY ID (for logged-in user)
export const getMedicineById = async (req, res) => {
  try {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const medicine = await Medicine.findOne({ _id: req.params.id, user: userId });
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.status(200).json(medicine);
  } catch (error) {
    console.error('Get medicine by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// UPDATE (for logged-in user)
export const updateMedicine = async (req, res) => {
  try {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const { name, type, dosage, notification = false, time = '' } = req.body;

    if (!name || !type || !dosage) {
      return res.status(400).json({ error: 'Name, type, and dosage are required.' });
    }

    const formattedTime = formatTo12HourClock(time);
    if (time && !formattedTime) {
      return res.status(400).json({ error: 'Invalid time format. Use "HH:mm" 24-hour format.' });
    }

    if (!isValidTimeFormat(formattedTime)) {
      return res.status(400).json({ error: 'Time must be in "hh:mm AM/PM" format, e.g., "08:00 AM"' });
    }

    const medicine = await Medicine.findOneAndUpdate(
      { _id: req.params.id, user: userId },
      {
        name: name.trim(),
        type: type.trim(),
        dosage: dosage.trim(),
        notification,
        time: formattedTime,
      },
      { new: true, runValidators: true }
    );

    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }

    res.status(200).json({ message: 'Medicine updated successfully', medicine });
  } catch (error) {
    console.error('Update medicine error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// DELETE (for logged-in user)
export const deleteMedicine = async (req, res) => {
  try {
    const userId = checkAuth(req, res);
    if (!userId) return;

    const medicine = await Medicine.findOneAndDelete({ _id: req.params.id, user: userId });
    if (!medicine) {
      return res.status(404).json({ error: 'Medicine not found' });
    }
    res.status(200).json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    console.error('Delete medicine error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
