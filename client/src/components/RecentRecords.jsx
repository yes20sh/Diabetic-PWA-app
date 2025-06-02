import React from 'react';

const recentData = [
  {
    date: 'May 28',
    fastingTime: '7:00 AM',
    fasting: 95,
    afterLunchTime: '2:00 PM',
    afterLunch: 135,
  },
  {
    date: 'May 27',
    fastingTime: '6:50 AM',
    fasting: 110,
    afterLunchTime: '1:45 PM',
    afterLunch: 145,
  },
  {
    date: 'May 26',
    fastingTime: '7:10 AM',
    fasting: 88,
    afterLunchTime: '2:10 PM',
    afterLunch: 138,
  },
  {
    date: 'May 25',
    fastingTime: '6:55 AM',
    fasting: 102,
    afterLunchTime: '1:55 PM',
    afterLunch: 152,
  },
  {
    date: 'May 24',
    fastingTime: '7:05 AM',
    fasting: 121,
    afterLunchTime: '2:05 PM',
    afterLunch: 178,
  },
];

const getStatus = (value) => {
  if (value >= 180) return 'Very High';
  if (value >= 140) return 'High';
  if (value >= 70) return 'In Range';
  return 'Low';
};

const getStatusColor = (value) => {
  if (value >= 180) return 'text-red-500';
  if (value >= 140) return 'text-orange-500';
  if (value >= 70) return 'text-teal-400';
  return 'text-blue-400';
};

const RecentRecords = () => (
  <section className="p-4 mt-6 bg-gray-900 rounded-lg shadow-lg max-w-full">
    <h1 className="text-2xl font-bold text-teal-400 mb-4">Recent Records</h1>

    <div
      className="overflow-x-auto"
      style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE 10+
      }}
    >
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari and Opera */
          div::-webkit-scrollbar {
            display: none;
          }

          /* Sticky column styling */
          th.sticky-col, td.sticky-col {
            position: sticky;
            left: 0;
            background: #1a202c; /* dark gray background for sticky column */
            z-index: 10;
            border-right: 1px solid #2d3748; /* darker border */
            color: #4fd1c5; /* teal-400 */
          }

          /* Table header styles */
          thead tr {
            background-color: #2d3748; /* dark gray */
            color: #4fd1c5; /* teal-400 */
          }

          /* Table rows */
          tbody tr {
            border-bottom: 1px solid #4a5568; /* gray border */
          }

          tbody tr:last-child {
            border-bottom: none;
          }
        `}
      </style>

      <table className="min-w-full rounded-lg">
        <thead>
          <tr>
            <th className="sticky-col py-3 px-4 text-left font-semibold">Date</th>
            <th className="py-3 px-4 text-left font-semibold">Fasting (mg/dL)</th>
            <th className="py-3 px-4 text-left font-semibold">Fasting Time</th>
            <th className="py-3 px-4 text-left font-semibold">Fasting Status</th>
            <th className="py-3 px-4 text-left font-semibold">After Lunch (mg/dL)</th>
            <th className="py-3 px-4 text-left font-semibold">After Lunch Time</th>
            <th className="py-3 px-4 text-left font-semibold">After Lunch Status</th>
          </tr>
        </thead>
        <tbody>
          {recentData.map((record, idx) => (
            <tr key={idx}>
              <td className="sticky-col py-3 px-4 font-semibold">{record.date}</td>
              <td className="py-3 px-4 text-gray-300">{record.fasting}</td>
              <td className="py-3 px-4 text-gray-300">{record.fastingTime}</td>
              <td className={`py-3 px-4 font-semibold ${getStatusColor(record.fasting)}`}>
                {getStatus(record.fasting)}
              </td>
              <td className="py-3 px-4 text-gray-300">{record.afterLunch}</td>
              <td className="py-3 px-4 text-gray-300">{record.afterLunchTime}</td>
              <td className={`py-3 px-4 font-semibold ${getStatusColor(record.afterLunch)}`}>
                {getStatus(record.afterLunch)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default RecentRecords;
