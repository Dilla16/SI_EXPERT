import { useEffect, useState } from "react";
import { BarChartBig } from "lucide-react";
import { Card } from "../../components/ui/card";

const DashboardCard = () => {
  const [rtaMetrics, setRtaMetrics] = useState({
    rta: 123,
    rtaProgress: 45,
    rtaComplete: 78,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRtaMetrics({
        rta: Math.floor(Math.random() * 100),
        rtaProgress: Math.floor(Math.random() * 50),
        rtaComplete: Math.floor(Math.random() * 50),
      });
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const metrics = [
    { label: "Return To Analysis", value: rtaMetrics.rta },
    { label: "RTA In Progress", value: rtaMetrics.rtaProgress },
    { label: "RTA Submitted", value: rtaMetrics.rtaComplete },
    { label: "RTA Completed", value: rtaMetrics.rta }, // Example of repeating or different metrics
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <Card
            key={index}
            className="border bg-white px-8 py-6 rounded-md shadow-sm space-y-4"
          >
            <div className="flex justify-between w-full items-center">
              <div className="text-gray-700 text-xs">{metric.label}</div>
              <div>
                <BarChartBig className="text-gray-700 w-4" />
              </div>
            </div>
            <div className="grid justify-start">
              <div className="text-4xl font-bold text-gray-800 text-start">{metric.value}</div>
            </div>
            <div className="text-xs text-gray-400 text-left">+2 From Last Month</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
