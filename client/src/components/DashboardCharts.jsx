import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useNavigate } from 'react-router-dom';

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

const getGlucoseColor = (value) => {
  if (value < 70) return 'rgba(59, 130, 246, 0.7)';
  if (value < 140) return 'rgba(34, 197, 94, 0.7)';
  if (value < 180) return 'rgba(245, 158, 11, 0.7)';
  return 'rgba(239, 68, 68, 0.7)';
};

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const DashboardCharts = () => {
  const yearlyRef = useRef(null);
  const quarterlyRef = useRef(null);
  const monthlyRef = useRef(null);
  const pieRef = useRef(null);
  const charts = useRef([]);
  const [chartData, setChartData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch('http://localhost:5000/api/charts/glucose', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (res.status === 401) {
          navigate('/login');
          return;
        }

        const data = await res.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchChartData();
  }, [navigate]);

  useEffect(() => {
    if (!chartData) return;

    const { yearly, quarterly, monthly } = chartData;
    const yMin = 50;
    const yMax = 400;

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
          ticks: { stepSize: 50, color: '#94a3b8' },
          grid: { color: '#1e293b' }
        },
      },
    };

    if (yearlyRef.current) {
      const chart = new Chart(yearlyRef.current, {
        type: 'line',
        data: {
          labels: yearly.labels,
          datasets: [
            {
              label: 'Fasting',
              data: yearly.fasting,
              borderColor: 'rgba(34, 197, 94, 1)',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              tension: 0.4,
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'After Lunch',
              data: yearly.postLunch,
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

    // --- Updated Quarterly Chart Section ---
    if (quarterlyRef.current) {
      // Defensive: Ensure arrays are valid and match label length
      const labels = Array.isArray(quarterly.labels) ? quarterly.labels : [];
      const fasting = Array.isArray(quarterly.fasting) ? quarterly.fasting : labels.map(() => 0);
      let postLunch = Array.isArray(quarterly.postLunch) ? quarterly.postLunch : labels.map(() => 0);

      // Fix length mismatch
      if (postLunch.length !== labels.length) {
        console.warn('quarterly.postLunch length mismatch:', postLunch.length, 'vs', labels.length);
        postLunch = labels.map((_, i) => postLunch[i] ?? 0);
      }

      const chart = new Chart(quarterlyRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Fasting Avg',
              data: fasting,
              backgroundColor: 'rgba(34, 197, 94, 0.7)',
              yAxisID: 'y',
            },
            {
              label: 'After Lunch Avg',
              data: postLunch,
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
    // --- End Quarterly Chart Section ---

    if (monthlyRef.current) {
      const chart = new Chart(monthlyRef.current, {
        type: 'line',
        data: {
          labels: monthly.labels,
          datasets: [
            {
              label: 'Fasting',
              data: monthly.fasting,
              borderColor: 'rgba(59, 130, 246, 1)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.3,
              fill: false,
              yAxisID: 'y',
            },
            {
              label: 'After Lunch',
              data: monthly.postLunch,
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

    if (pieRef.current) {
      const lastFasting = monthly.fasting.at(-1);
      const lastPostLunch = monthly.postLunch.at(-1);

      const pieChart = new Chart(pieRef.current, {
        type: 'pie',
        data: {
          labels: [
            `Current Fasting: ${lastFasting}`,
            `Current After Lunch: ${lastPostLunch}`
          ],
          datasets: [
            {
              data: [lastFasting, lastPostLunch],
              backgroundColor: [
                getGlucoseColor(lastFasting),
                getGlucoseColor(lastPostLunch),
              ],
              hoverOffset: 20,
            }
          ]
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
            }
          }
        }
      });
      charts.current.push(pieChart);
    }
  }, [chartData]);

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
