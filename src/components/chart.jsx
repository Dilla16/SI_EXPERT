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

  // Data for the cards
  const cardsData = [
    { label: "RTA", value: rtaMetrics.rta, color: "text-blue-500" },
    { label: "RTA Progress", value: rtaMetrics.rtaProgress, color: "text-green-500" },
    { label: "RTA Complete", value: rtaMetrics.rtaComplete, color: "text-purple-500" },
    { label: "RTA Complete", value: rtaMetrics.rtaComplete, color: "text-purple-500" },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="flex items-center justify-center flex-col border bg-white p-4 rounded-md shadow-sm"
          >
            <PieChart className={`h-full w-10 mb-2 ${card.color}`} />
            <div className="text-gray-600">{card.label}</div>
            <div className="text-2xl font-bold text-gray-800">{card.value}</div>
          </div>
        ))}
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
