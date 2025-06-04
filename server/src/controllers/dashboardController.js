import Report from '../models/reportModel.js';

// Helper to group data by key function
const groupBy = (array, keyFn) => {
  return array.reduce((result, item) => {
    const key = keyFn(item);
    if (!result[key]) result[key] = [];
    result[key].push(item);
    return result;
  }, {});
};

// Helper to calculate average
const average = (arr) => {
  if (!arr.length) return 0;
  return Math.round(arr.reduce((sum, val) => sum + val, 0) / arr.length);
};

export const getDashboardGlucoseData = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    // Fetch only current user's reports, sorted by date
    const reports = await Report.find({ user: req.user.id }).sort({ date: 1 });

    // Group by day (YYYY-MM-DD)
    const monthlyGrouped = groupBy(reports, r =>
      r.date.toISOString().slice(0, 10)
    );

    // Group by quarter (e.g., Q1-2025)
    const quarterlyGrouped = groupBy(reports, r => {
      const year = r.date.getFullYear();
      const quarter = Math.floor(r.date.getMonth() / 3) + 1;
      return `Q${quarter}-${year}`;
    });

    // Group by month (e.g., Jan-2025)
    const yearlyGrouped = groupBy(reports, r => {
      const year = r.date.getFullYear();
      const month = r.date.toLocaleString('default', { month: 'short' });
      return `${month}-${year}`;
    });

    const getDataFromGroup = (group) => {
      // Sort labels chronologically
      const labels = Object.keys(group).sort();
      const fasting = labels.map(label =>
        average(group[label].map(r => r.fastingTest).filter(Boolean))
      );
      const postLunch = labels.map(label =>
        average(group[label].map(r => r.afterLunchTest).filter(Boolean))
      );
      return { labels, fasting, postLunch };
    };

    const monthly = getDataFromGroup(monthlyGrouped);
    const quarterly = getDataFromGroup(quarterlyGrouped);
    const yearly = getDataFromGroup(yearlyGrouped);

    res.status(200).json({ yearly, quarterly, monthly });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch dashboard data' });
  }
};
