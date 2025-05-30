import React from 'react';
import NavbarDesktop from '../components/NavbarDesktop';
import NavbarMobile from '../components/NavbarMobile';
import DashboardCharts from '../components/DashboardCharts';
import CurrentStats from '../components/CurrentStats';
import RecentRecords from '../components/RecentRecords';
import AddEntryForm from '../components/AddEntryForm';

const DashboardPage = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 min-h-screen font-sans pb-20 md:pb-0 overflow-auto scrollbar-hide">
      {/* Navbar: Desktop & Tablet */}
      <NavbarDesktop />
      {/* Navbar: Mobile */}
      <NavbarMobile />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-8">
        <section>
          <h1 className="text-2xl md:text-3xl font-bold text-purple-700 mb-4">Glucose Trends</h1>
          <DashboardCharts />
        </section>


        <section>
          <RecentRecords />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;



// import React from 'react';
// import NavbarDesktop from '../components/NavbarDesktop';
// import NavbarMobile from '../components/NavbarMobile';
// import DashboardCharts from '../components/DashboardCharts';
// import CurrentStats from '../components/CurrentStats';
// import RecentRecords from '../components/RecentRecords';
// import AddEntryForm from '../components/AddEntryForm';

// const DashboardPage = () => {
//   return (
//     <div className="bg-black text-white min-h-screen font-sans pb-20 md:pb-0 overflow-auto scrollbar-hide">
//       {/* Navbar: Desktop & Tablet */}
//       <NavbarDesktop />

//       {/* Navbar: Mobile */}
//       <NavbarMobile />

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto px-4 md:px-8 py-6 space-y-10">
//         <section>
//           <h1 className="text-2xl md:text-3xl font-bold text-teal-400 mb-4">Glucose Trends</h1>
//           <DashboardCharts />
//         </section>

//         <section>
//           <CurrentStats />
//         </section>

//         <section>
//           <AddEntryForm />
//         </section>

//         <section>
//           <h2 className="text-xl md:text-2xl font-semibold text-orange-400 mb-3">Recent Records</h2>
//           <RecentRecords />
//         </section>
//       </main>
//     </div>
//   );
// };

// export default DashboardPage;
