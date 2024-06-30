// DashboardCard.jsx

import { PieChart } from "lucide-react"; // Importing icons for example
import { useEffect, useState } from "react";

const DashboardCard = () => {
  // Dummy data for RTA metrics
  const [rtaMetrics, setRtaMetrics] = useState({
    rta: 123,
    rtaProgress: 45,
    rtaComplete: 78,
  });

  // Dummy data for graph (example)
  const [graphData, setGraphData] = useState([10, 20, 30, 40, 50]);

  // Example effect to simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRtaMetrics({
        rta: Math.floor(Math.random() * 100),
        rtaProgress: Math.floor(Math.random() * 50),
        rtaComplete: Math.floor(Math.random() * 50),
      });

      setGraphData(graphData.map((val) => val + Math.floor(Math.random() * 10)));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [graphData]);

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="flex items-center justify-center flex-col border bg-white p-4 rounded-md shadow-md">
          <PieChart className="h-full w-10 text-blue-500 mb-2" />
          <div className="text-gray-600">RTA</div>
          <div className="text-2xl font-bold text-gray-800">{rtaMetrics.rta}</div>
        </div>
        <div className="flex items-center justify-center flex-col border bg-white p-4 rounded-md shadow-md">
          <PieChart className="h-full w-10 text-green-500 mb-2" />
          <div className="text-gray-600">RTA Progress</div>
          <div className="text-2xl font-bold text-gray-800">{rtaMetrics.rtaProgress}</div>
        </div>
        <div className="flex items-center justify-center flex-col border bg-white p-4 rounded-md shadow-md">
          <PieChart className="h-full w-10 text-purple-500 mb-2" />
          <div className="text-gray-600">RTA Complete</div>
          <div className="text-2xl font-bold text-gray-800">{rtaMetrics.rtaComplete}</div>
        </div>
      </div>
      <h2 className="text-lg font-semibold mb-4">Goods In Analysis</h2>
      <div className="border border-gray-200 rounded-md p-4">
        {/* Example graph */}
        <div className="flex items-center justify-center">
          <svg
            className="h-32 w-full"
            viewBox="0 0 100 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            {graphData.map((val, index) => (
              <rect
                key={index}
                x={index * 10}
                y={50 - val}
                width="10"
                height={val}
                fill="#4F46E5"
              />
            ))}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
