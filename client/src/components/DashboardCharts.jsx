// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const glucoseLevelBackgroundPlugin = {
//   id: 'glucoseLevelBackground',
//   beforeDraw(chart) {
//     const { ctx, chartArea: { left, right, top, bottom }, scales } = chart;
//     if (!scales.y) return;

//     ctx.save();

//     // Clip drawing area to the chart area bounded by axes
//     ctx.beginPath();
//     ctx.rect(left, top, right - left, bottom - top);
//     ctx.clip();

//     const ranges = [
//       { label: 'Very High', min: 180, max: 10000, color: 'rgba(239, 68, 68, 0.2)' },
//       { label: 'High', min: 140, max: 179, color: 'rgba(245, 158, 11, 0.2)' },
//       { label: 'Normal', min: 70, max: 139, color: 'rgba(34, 197, 94, 0.2)' },
//       { label: 'Low', min: 0, max: 69, color: 'rgba(59, 130, 246, 0.2)' },
//     ];

//     ranges.forEach(range => {
//       const yMax = scales.y.getPixelForValue(range.min);
//       const yMin = scales.y.getPixelForValue(range.max);
//       ctx.fillStyle = range.color;
//       ctx.fillRect(left, yMin, right - left, yMax - yMin);
//     });

//     ctx.restore();
//   }
// };

// const getGlucoseColor = (value) => {
//   if (value >= 180) return 'rgba(239, 68, 68, 0.7)';
//   if (value >= 140) return 'rgba(245, 158, 11, 0.7)';
//   if (value >= 70) return 'rgba(34, 197, 94, 0.7)';
//   return 'rgba(59, 130, 246, 0.7)';
// };

// const DashboardCharts = () => {
//   const yearlyRef = useRef(null);
//   const quarterlyRef = useRef(null);
//   const monthlyRef = useRef(null);
//   const pieRef = useRef(null);
//   const hba1cRef = useRef(null);
//   const bpRef = useRef(null);
//   const charts = useRef([]);

//   useEffect(() => {
//     const yearlyFasting = [90, 92, 95, 93, 97, 100, 98, 96, 284, 91, 93, 92];
//     const yearlyPostLunch = [130, 140, 145, 135, 150, 160, 155, 148, 143, 138, 142, 136];
//     const quarterlyFasting = [92, 95, 244, 93];
//     const quarterlyPostLunch = [145, 270, 140, 135];
//     const monthlyFasting = [90, 231, 92, 93, 94, 92, 91, 93, 235, 94, 92, 91];
//     const monthlyPostLunch = [135, 138, 140, 142, 139, 137, 341, 144, 146, 145, 143, 140];
//     const labelsYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
//     const labelsQuarter = ['Q1', 'Q2', 'Q3', 'Q4'];
//     const labelsMonth = Array.from({ length: 12 }, (_, i) => `Day ${i + 1}`);

//     const allValues = [
//       ...yearlyFasting, ...yearlyPostLunch,
//       ...quarterlyFasting, ...quarterlyPostLunch,
//       ...monthlyFasting, ...monthlyPostLunch,
//     ];

//     const minValue = Math.min(...allValues);
//     const maxValue = Math.max(...allValues);
//     const padding = 20;
//     const yMin = Math.max(0, minValue - padding);
//     const yMax = maxValue + padding;

//     charts.current.forEach(chart => chart.destroy());
//     charts.current = [];

//     // Yearly
//     if (yearlyRef.current) {
//       const chart = new Chart(yearlyRef.current, {
//         type: 'line',
//         data: {
//           labels: labelsYear,
//           datasets: [
//             {
//               label: 'Fasting',
//               data: yearlyFasting,
//               borderColor: 'rgba(59, 130, 246, 1)',
//               backgroundColor: 'rgba(59, 130, 246, 0.1)',
//               tension: 0.4,
//               fill: false,
//               yAxisID: 'y',
//             },
//             {
//               label: 'After Lunch',
//               data: yearlyPostLunch,
//               borderColor: 'rgba(239, 68, 68, 1)',
//               backgroundColor: 'rgba(239, 68, 68, 0.1)',
//               tension: 0.4,
//               fill: false,
//               yAxisID: 'y',
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: {
//               min: yMin,
//               max: yMax,
//               ticks: { stepSize: 10 },
//             },
//           },
//         },
//         plugins: [glucoseLevelBackgroundPlugin],
//       });
//       charts.current.push(chart);
//     }

//     // Quarterly
//     if (quarterlyRef.current) {
//       const chart = new Chart(quarterlyRef.current, {
//         type: 'bar',
//         data: {
//           labels: labelsQuarter,
//           datasets: [
//             {
//               label: 'Fasting Avg',
//               data: quarterlyFasting,
//               backgroundColor: 'rgba(59, 130, 246, 0.7)',
//               yAxisID: 'y',
//             },
//             {
//               label: 'After Lunch Avg',
//               data: quarterlyPostLunch,
//               backgroundColor: 'rgba(239, 68, 68, 0.7)',
//               yAxisID: 'y',
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: {
//               min: yMin,
//               max: yMax,
//               ticks: { stepSize: 10 },
//             },
//           },
//         },
//         plugins: [glucoseLevelBackgroundPlugin],
//       });
//       charts.current.push(chart);
//     }

//     // Monthly
//     if (monthlyRef.current) {
//       const chart = new Chart(monthlyRef.current, {
//         type: 'line',
//         data: {
//           labels: labelsMonth,
//           datasets: [
//             {
//               label: 'Fasting',
//               data: monthlyFasting,
//               borderColor: 'rgba(59, 130, 246, 1)',
//               backgroundColor: 'rgba(59, 130, 246, 0.1)',
//               tension: 0.3,
//               fill: false,
//               yAxisID: 'y',
//             },
//             {
//               label: 'After Lunch',
//               data: monthlyPostLunch,
//               borderColor: 'rgba(239, 68, 68, 1)',
//               backgroundColor: 'rgba(239, 68, 68, 0.1)',
//               tension: 0.3,
//               fill: false,
//               yAxisID: 'y',
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: {
//               min: yMin,
//               max: yMax,
//               ticks: { stepSize: 10 },
//             },
//           },
//         },
//         plugins: [glucoseLevelBackgroundPlugin],
//       });
//       charts.current.push(chart);
//     }

//     // Pie Chart
//     if (pieRef.current) {
//       const currentFasting = monthlyFasting[monthlyFasting.length - 1];
//       const currentAfterLunch = monthlyPostLunch[monthlyPostLunch.length - 1];

//       const pieChart = new Chart(pieRef.current, {
//         type: 'pie',
//         data: {
//           labels: [
//             `Current Fasting: ${currentFasting}`,
//             `Current After Lunch: ${currentAfterLunch}`
//           ],
//           datasets: [
//             {
//               label: 'Current Glucose Levels',
//               data: [currentFasting, currentAfterLunch],
//               backgroundColor: [
//                 getGlucoseColor(currentFasting),
//                 getGlucoseColor(currentAfterLunch),
//               ],
//               hoverOffset: 20,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: { position: 'bottom' },
//             tooltip: {
//               callbacks: {
//                 label: (context) => `${context.label}: ${context.parsed} mg/dL`
//               }
//             },
//           },
//         },
//       });
//       charts.current.push(pieChart);
//     }

//     // HbA1c Chart
//     const hba1cData = [5.2, 5.5, 5.6, 5.4, 5.9, 6.2, 6.4];
//     const bpSystolic = [120, 125, 130, 128, 135, 140, 138];
//     const bpDiastolic = [80, 82, 85, 83, 87, 90, 88];
//     const weeks = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'];

//     if (hba1cRef.current) {
//       const chart = new Chart(hba1cRef.current, {
//         type: 'line',
//         data: {
//           labels: weeks,
//           datasets: [
//             {
//               label: 'HbA1c (%)',
//               data: hba1cData,
//               borderColor: 'rgba(147, 51, 234, 1)',
//               backgroundColor: 'rgba(147, 51, 234, 0.1)',
//               tension: 0.4,
//               fill: false,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: {
//               min: 4,
//               max: 14,
//               ticks: { stepSize: 1 },
//             },
//           },
//         },
//       });
//       charts.current.push(chart);
//     }

//     if (bpRef.current) {
//       const chart = new Chart(bpRef.current, {
//         type: 'line',
//         data: {
//           labels: weeks,
//           datasets: [
//             {
//               label: 'Systolic (mmHg)',
//               data: bpSystolic,
//               borderColor: 'rgba(220, 38, 38, 1)',
//               backgroundColor: 'rgba(220, 38, 38, 0.1)',
//               tension: 0.4,
//               fill: false,
//             },
//             {
//               label: 'Diastolic (mmHg)',
//               data: bpDiastolic,
//               borderColor: 'rgba(37, 99, 235, 1)',
//               backgroundColor: 'rgba(37, 99, 235, 0.1)',
//               tension: 0.4,
//               fill: false,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           scales: {
//             y: {
//               min: 60,
//               max: 160,
//               ticks: { stepSize: 10 },
//             },
//           },
//         },
//       });
//       charts.current.push(chart);
//     }

//     return () => {
//       charts.current.forEach(chart => chart.destroy());
//       charts.current = [];
//     };
//   }, []);

//   return (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <div className="bg-white p-4 rounded-2xl shadow-lg w-full">
//         <h2 className="text-lg font-semibold text-indigo-600 mb-2">Yearly Overview</h2>
//         <div className="h-64 w-full">
//           <canvas ref={yearlyRef} className="w-full h-full" />
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-2xl shadow-lg w-full">
//         <h2 className="text-lg font-semibold text-pink-600 mb-2">Quarterly Trends</h2>
//         <div className="h-64 w-full">
//           <canvas ref={quarterlyRef} className="w-full h-full" />
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-2xl shadow-lg w-full">
//         <h2 className="text-lg font-semibold text-emerald-600 mb-2">Monthly Breakdown</h2>
//         <div className="h-64 w-full">
//           <canvas ref={monthlyRef} className="w-full h-full" />
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-2xl shadow-lg w-full">
//         <h2 className="text-lg font-semibold text-purple-600 mb-2">Current Glucose Levels</h2>
//         <div className="h-64 w-full">
//           <canvas ref={pieRef} className="w-full h-full" />
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-2xl shadow-lg w-full">
//         <h2 className="text-lg font-semibold text-violet-600 mb-2">HbA1c Over Time</h2>
//         <div className="h-64 w-full">
//           <canvas ref={hba1cRef} className="w-full h-full" />
//         </div>
//       </div>

//       <div className="bg-white p-4 rounded-2xl shadow-lg w-full">
//         <h2 className="text-lg font-semibold text-red-600 mb-2">Blood Pressure Readings</h2>
//         <div className="h-64 w-full">
//           <canvas ref={bpRef} className="w-full h-full" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardCharts;



import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

// Plugin for background glucose level ranges
const glucoseLevelBackgroundPlugin = {
  id: 'glucoseLevelBackground',
  beforeDraw(chart) {
    const { ctx, chartArea: { left, right, top, bottom }, scales } = chart;
    if (!scales.y) return;

    ctx.save();
    ctx.beginPath();
    ctx.rect(left, top, right - left, bottom - top);
    ctx.clip();

    const ranges = [
      { label: 'Very High', min: 180, max: 10000, color: 'rgba(239, 68, 68, 0.2)' },
      { label: 'High', min: 140, max: 179, color: 'rgba(245, 158, 11, 0.2)' },
      { label: 'Normal', min: 70, max: 139, color: 'rgba(34, 197, 94, 0.2)' },
      { label: 'Low', min: 0, max: 69, color: 'rgba(59, 130, 246, 0.2)' },
    ];

    ranges.forEach(range => {
      const yMax = scales.y.getPixelForValue(range.min);
      const yMin = scales.y.getPixelForValue(range.max);
      ctx.fillStyle = range.color;
      ctx.fillRect(left, yMin, right - left, yMax - yMin);
    });

    ctx.restore();
  }
};

// Helper to determine glucose zone color
const getGlucoseColor = (value) => {
  if (value < 70) return 'rgba(59, 130, 246, 0.7)';
  if (value < 140) return 'rgba(34, 197, 94, 0.7)';
  if (value < 180) return 'rgba(245, 158, 11, 0.7)';
  return 'rgba(239, 68, 68, 0.7)';
};

const DashboardCharts = () => {
  const yearlyRef = useRef(null);
  const quarterlyRef = useRef(null);
  const monthlyRef = useRef(null);
  const pieRef = useRef(null);
  const charts = useRef([]);

  useEffect(() => {
    // ✅ Dummy Data
    const labelsYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const yearlyFasting = [100, 105, 110, 98, 115, 120, 118, 112, 108, 109, 111, 113];
    const yearlyPostLunch = [135, 140, 145, 138, 150, 155, 160, 158, 152, 148, 146, 143];

    const labelsQuarter = ['Q1', 'Q2', 'Q3', 'Q4'];
    const quarterlyFasting = [105, 111, 116, 110];
    const quarterlyPostLunch = [140, 150, 157, 145];

    const labelsMonth = ['1', '5', '10', '15', '20', '25', '30'];
    const monthlyFasting = [105, 107, 102, 100, 106, 109, 108];
    const monthlyPostLunch = [145, 150, 155, 148, 142, 147, 151];

    const yMin = 50;
    const yMax = 200;

    // Cleanup
    charts.current.forEach(chart => chart.destroy());
    charts.current = [];

    const configCommon = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: '#a5f3fc' } },
        tooltip: {
          backgroundColor: '#0f172a',
          titleColor: '#22c55e',
          bodyColor: '#fbbf24',
        }
      },
      scales: {
        x: {
          ticks: { color: '#94a3b8' },
          grid: { color: '#1e293b' }
        },
        y: {
          min: yMin,
          max: yMax,
          ticks: { stepSize: 10, color: '#94a3b8' },
          grid: { color: '#1e293b' }
        },
      },
    };

    // Yearly Line Chart
    if (yearlyRef.current) {
      const chart = new Chart(yearlyRef.current, {
        type: 'line',
        data: {
          labels: labelsYear,
          datasets: [
            {
              label: 'Fasting',
              data: yearlyFasting,
              borderColor: 'rgba(34, 197, 94, 1)',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              tension: 0.4,
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'After Lunch',
              data: yearlyPostLunch,
              borderColor: 'rgba(245, 158, 11, 1)',
              backgroundColor: 'rgba(245, 158, 11, 0.15)',
              tension: 0.4,
              fill: false,
              yAxisID: 'y',
            },
          ],
        },
        options: configCommon,
        plugins: [glucoseLevelBackgroundPlugin],
      });
      charts.current.push(chart);
    }

    // Quarterly Bar Chart
    if (quarterlyRef.current) {
      const chart = new Chart(quarterlyRef.current, {
        type: 'bar',
        data: {
          labels: labelsQuarter,
          datasets: [
            {
              label: 'Fasting Avg',
              data: quarterlyFasting,
              backgroundColor: 'rgba(34, 197, 94, 0.7)',
              yAxisID: 'y',
            },
            {
              label: 'After Lunch Avg',
              data: quarterlyPostLunch,
              backgroundColor: 'rgba(245, 158, 11, 0.7)',
              yAxisID: 'y',
            },
          ],
        },
        options: configCommon,
        plugins: [glucoseLevelBackgroundPlugin],
      });
      charts.current.push(chart);
    }

    // Monthly Line Chart
    if (monthlyRef.current) {
      const chart = new Chart(monthlyRef.current, {
        type: 'line',
        data: {
          labels: labelsMonth,
          datasets: [
            {
              label: 'Fasting',
              data: monthlyFasting,
              borderColor: 'rgba(59, 130, 246, 1)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.3,
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'After Lunch',
              data: monthlyPostLunch,
              borderColor: 'rgba(239, 68, 68, 1)',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              tension: 0.3,
              fill: false,
              yAxisID: 'y',
            },
          ],
        },
        options: configCommon,
        plugins: [glucoseLevelBackgroundPlugin],
      });
      charts.current.push(chart);
    }

    // Pie Chart
    if (pieRef.current) {
      const currentFasting = monthlyFasting.at(-1);
      const currentAfterLunch = monthlyPostLunch.at(-1);

      const pieChart = new Chart(pieRef.current, {
        type: 'pie',
        data: {
          labels: [
            `Current Fasting: ${currentFasting}`,
            `Current After Lunch: ${currentAfterLunch}`
          ],
          datasets: [
            {
              label: 'Current Glucose Levels',
              data: [currentFasting, currentAfterLunch],
              backgroundColor: [
                getGlucoseColor(currentFasting),
                getGlucoseColor(currentAfterLunch),
              ],
              hoverOffset: 20,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed} mg/dL`
              }
            },
          },
        },
      });
      charts.current.push(pieChart);
    }

    return () => charts.current.forEach(chart => chart.destroy());
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[{
        title: 'Yearly Overview', color: 'text-teal-400', ref: yearlyRef
      }, {
        title: 'Quarterly Trends', color: 'text-orange-400', ref: quarterlyRef
      }, {
        title: 'Monthly Glucose', color: 'text-blue-400', ref: monthlyRef
      }, {
        title: 'Current Snapshot', color: 'text-pink-400', ref: pieRef
      }].map(({ title, color, ref }) => (
        <div key={title} className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-slate-700">
          <h2 className={`text-lg font-semibold mb-2 ${color}`}>{title}</h2>
          <div className="h-64 w-full">
            <canvas ref={ref} className="w-full h-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCharts;
