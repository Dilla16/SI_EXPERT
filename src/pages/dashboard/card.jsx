import { useEffect, useState } from "react";
import axios from "axios";
import { BarChartBig } from "lucide-react";
import { Card } from "../../components/ui/card";

const DashboardCard = () => {
  const [rtaMetrics, setRtaMetrics] = useState({
    total_return: 0,
    signed: 0,
    submitted: 0,
    closed: 0,
  });

  const fetchMetrics = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("https://api-siexpert.vercel.app/api/return/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRtaMetrics(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching return stats:", error.message || error);
    }
  };

  useEffect(() => {
    fetchMetrics(); // Fetch data on component mount

    const interval = setInterval(fetchMetrics, 30000); // Update every 30 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const metrics = [
    { label: "Total Returns", value: rtaMetrics.total_return },
    { label: "Signed", value: rtaMetrics.signed },
    { label: "Submitted", value: rtaMetrics.submitted },
    { label: "Closed", value: rtaMetrics.closed },
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
              <div className="text-4xl font-bold text-gray-800 text-start">{metric.value} </div>
            </div>
            <div className="text-xs text-gray-400 text-left">Pcs In Total</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardCard;
