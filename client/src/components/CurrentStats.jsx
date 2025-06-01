// import React from 'react';

// const CurrentStats = () => (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//     <div className="bg-white p-4 rounded-2xl shadow-lg">
//       <h2 className="text-lg font-semibold text-red-600 mb-2">Current High / Low</h2>
//       <p className="text-sm">High: <span className="text-red-500 font-bold">180 mg/dL</span></p>
//       <p className="text-sm">Low: <span className="text-blue-500 font-bold">65 mg/dL</span></p>
//     </div>
//     <div className="bg-white p-4 rounded-2xl shadow-lg">
//       <h2 className="text-lg font-semibold text-yellow-600 mb-2">HBSI Score</h2>
//       <p className="text-3xl font-bold text-yellow-500">7.4</p>
//       <p className="text-sm text-gray-500">(Health Blood Sugar Index)</p>
//     </div>
//   </div>
// );

// export default CurrentStats;



import React from 'react';

const CurrentStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-teal-700">
      <h2 className="text-lg font-semibold text-red-400 mb-3">Current High / Low</h2>
      <p className="text-sm text-gray-300">
        High: <span className="text-red-500 font-bold">180 mg/dL</span>
      </p>
      <p className="text-sm text-gray-300">
        Low: <span className="text-blue-400 font-bold">65 mg/dL</span>
      </p>
    </div>
    <div className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-orange-700">
      <h2 className="text-lg font-semibold text-yellow-400 mb-3">HBSI Score</h2>
      <p className="text-4xl font-bold text-yellow-300">7.4</p>
      <p className="text-sm text-gray-400">(Health Blood Sugar Index)</p>
    </div>
  </div>
);

export default CurrentStats;
