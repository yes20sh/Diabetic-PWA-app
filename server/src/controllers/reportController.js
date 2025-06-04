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

// Create a new report (linked to user id)
export const createReport = async (req, res) => {
  try {
    const {
      date,
      fastingTest,
      fastingTime,
      afterLunchTest,
      afterLunchTime,
    } = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (!date || fastingTest == null || !fastingTime) {
      return res.status(400).json({
        message: 'Missing required fields: date, fastingTest, and fastingTime are required.',
      });
    }

    const fastingValue = Number(fastingTest);
    if (Number.isNaN(fastingValue)) {
      return res.status(400).json({ message: 'Invalid fastingTest value' });
    }

    const fastingStatus = getStatus(fastingValue, 'fasting');

    let afterLunchValue;
    let afterLunchStatus;

    if (afterLunchTest != null) {
      afterLunchValue = Number(afterLunchTest);
      if (Number.isNaN(afterLunchValue)) {
        return res.status(400).json({ message: 'Invalid afterLunchTest value' });
      }
      afterLunchStatus = getStatus(afterLunchValue, 'afterLunch');
    }

    const reportData = {
      user: req.user.id,
      date,
      fastingTest: fastingValue,
      fastingTime,
      fastingStatus,
      ...(afterLunchValue != null && { afterLunchTest: afterLunchValue }),
      ...(afterLunchTime && { afterLunchTime }),
      ...(afterLunchStatus && { afterLunchStatus }),
    };

    const report = new Report(reportData);
    await report.save();

    res.status(201).json({ message: 'Report created', report });
  } catch (error) {
    console.error('Error creating report:', error);
    res.status(500).json({ message: 'Error creating report', error: error.message });
  }
};

// Get all reports of the logged-in user
export const getReports = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const reports = await Report.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(reports);
  } catch (error) {
    console.error('Error fetching reports:', error);
    res.status(500).json({ message: 'Error fetching reports', error: error.message });
  }
};

// ✅ Get a single report by ID
export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const report = await Report.findOne({ _id: id, user: req.user.id });

    if (!report) {
      return res.status(404).json({ message: 'Report not found or unauthorized' });
    }

    res.status(200).json(report);
  } catch (error) {
    console.error('Error fetching report by ID:', error);
    res.status(500).json({ message: 'Error fetching report by ID', error: error.message });
  }
};

// Update a report by ID
export const updateReport = async (req, res) => {
  try {
    const { id } = req.params;
    let updatedData = req.body;

    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    if (updatedData.fastingTest != null) {
      const fastingValue = Number(updatedData.fastingTest);
      if (Number.isNaN(fastingValue)) {
        return res.status(400).json({ message: 'Invalid fastingTest value' });
      }
      updatedData.fastingTest = fastingValue;
      updatedData.fastingStatus = getStatus(fastingValue, 'fasting');
    }

    if (updatedData.afterLunchTest != null) {
      const afterLunchValue = Number(updatedData.afterLunchTest);
      if (Number.isNaN(afterLunchValue)) {
        return res.status(400).json({ message: 'Invalid afterLunchTest value' });
      }
      updatedData.afterLunchTest = afterLunchValue;
      updatedData.afterLunchStatus = getStatus(afterLunchValue, 'afterLunch');
    }

    const existingReport = await Report.findOne({ _id: id, user: req.user.id });
    if (!existingReport) {
      return res.status(404).json({ message: 'Report not found or not authorized' });
    }

    const updatedReport = await Report.findByIdAndUpdate(id, updatedData, { new: true });
    res.status(200).json({ message: 'Report updated', report: updatedReport });
  } catch (error) {
    console.error('Error updating report:', error);
    res.status(500).json({ message: 'Error updating report', error: error.message });
  }
};
