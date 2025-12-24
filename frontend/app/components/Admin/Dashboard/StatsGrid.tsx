import React from 'react';

const StatsGrid = () => {
  // Data for the stats to make it clean to loop through
  const stats = [
    {
      title: "Total Sales",
      value: "$12,426",
      change: "+16%",
      iconPath: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      color: "green",
      bg: "bg-green-100",
      text: "text-green-600",
      changeColor: "text-green-500"
    },
    {
      title: "Total Orders",
      value: "1,245",
      change: "+4%",
      iconPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      color: "blue",
      bg: "bg-blue-100",
      text: "text-blue-600",
      changeColor: "text-blue-500"
    },
    {
      title: "Pending Delivery",
      value: "38",
      change: "Action Needed",
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
      color: "yellow",
      bg: "bg-yellow-100",
      text: "text-yellow-600",
      changeColor: "text-gray-400"
    },
    {
      title: "New Customers",
      value: "24",
      change: "+12%",
      iconPath: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
      color: "purple",
      bg: "bg-purple-100",
      text: "text-purple-600",
      changeColor: "text-purple-500"
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 text-sm font-medium">{stat.title}</h3>
            <span className={`p-2 rounded-full ${stat.bg} ${stat.text}`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.iconPath} />
              </svg>
            </span>
          </div>
          <div className="flex items-end justify-between">
            <h4 className="text-2xl font-bold text-slate-800">{stat.value}</h4>
            <span className={`${stat.changeColor} text-sm font-medium`}>{stat.change}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;