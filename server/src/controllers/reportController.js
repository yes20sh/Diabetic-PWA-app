import Report from '../models/reportModel.js';

// Helper to determine diabetic status
function getStatus(testValue, type) {
  if (type === 'fasting') {
    if (testValue < 70) return 'Low';
    if (testValue <= 99) return 'Normal';
    if (testValue <= 125) return 'Prediabetes';
    return 'High';
  } else if (type === 'afterLunch') {
    if (testValue < 70) return 'Low';
    if (testValue < 140) return 'Normal';
    if (testValue < 200) return 'Prediabetes';
    return 'High';
  }
  return 'Unknown';
}

// Create a new report
export const createReport = async (req, res) => {
  try {
    const {
      date,
      fastingTest,
      fastingTime,
      afterLunchTest,
      afterLunchTime
    } = req.body;

    // Optional: Validate required fields
    if (
      date === undefined ||
      fastingTest === undefined ||
      fastingTime === undefined ||
      afterLunchTest === undefined ||
      afterLunchTime === undefined
    ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const fastingStatus = getStatus(fastingTest, 'fasting');
    const afterLunchStatus = getStatus(afterLunchTest, 'afterLunch');

    const report = new Report({
      date,
      fastingTest,
      fastingTime,
      fastingStatus,
      afterLunchTest,
      afterLunchTime,
      afterLunchStatus
    });

    await report.save();
    res.status(201).json({ message: 'Report created', report });
  } catch (error) {
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};

// Get all reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ date: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

// Update a report by ID
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;

    // Automatically update statuses if test values are provided
    if (updatedData.fastingTest !== undefined) {
      updatedData.fastingStatus = getStatus(updatedData.fastingTest, 'fasting');
    }
    if (updatedData.afterLunchTest !== undefined) {
      updatedData.afterLunchStatus = getStatus(updatedData.afterLunchTest, 'afterLunch');
    }

    const updatedReport = await Report.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedReport) {
      return res.status(404).json({ message: 'Report not found' });
    }

    res.status(200).json({ message: 'Report updated', report: updatedReport });
  } catch (error) {
    res.status(500).json({ message: 'Error updating report', error: error.message });
  }
};
