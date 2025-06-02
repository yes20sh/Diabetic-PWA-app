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
