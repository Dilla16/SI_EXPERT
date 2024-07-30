import { useEffect, useState } from "react";
import { BarChartBig } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"; // Import BarChart components
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const DashboardCard = () => {
  // Dummy data for RTA metrics
  const [rtaMetrics, setRtaMetrics] = useState({
    rta: 123,
    rtaProgress: 45,
    rtaComplete: 78,
  });

  // Dummy data for graph (example)
  const [graphData, setGraphData] = useState([
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]);

  // Example effect to simulate data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRtaMetrics({
        rta: Math.floor(Math.random() * 100),
        rtaProgress: Math.floor(Math.random() * 50),
        rtaComplete: Math.floor(Math.random() * 50),
      });

      // Update graph data for demonstration
      setGraphData(
        graphData.map((item) => ({
          ...item,
          desktop: item.desktop + Math.floor(Math.random() * 10),
          mobile: item.mobile + Math.floor(Math.random() * 10),
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [graphData]);

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-4 mb-6">
        {/* RTA metrics cards */}
        <div className=" border bg-white px-8 py-6 rounded-md shadow-sm space-y-4">
          <div className="flex justify-between w-full items-center">
            <div className="text-gray-700 text-xs">Return Products</div>
            <div>
              <BarChartBig className="text-gray-700 w-4" />
            </div>
          </div>
          <div className="grid justify-start">
            <div className="text-4xl font-bold text-gray-800 text-start">{rtaMetrics.rta}</div>
          </div>
          <div className="text-xs text-gray-400 text-left">+2 From Last Month</div>
        </div>
        <div className=" border bg-white px-8 py-6 rounded-md shadow-sm space-y-4">
          <div className="flex justify-between w-full items-center">
            <div className="text-gray-700 text-xs">Return Products</div>
            <div>
              <BarChartBig className="text-gray-700 w-4" />
            </div>
          </div>
          <div className="grid justify-start">
            <div className="text-4xl font-bold text-gray-800 text-start">{rtaMetrics.rtaProgress}</div>
          </div>
          <div className="text-xs text-gray-400 text-left">+2 From Last Month</div>
        </div>
        <div className=" border bg-white px-8 py-6 rounded-md shadow-sm space-y-4">
          <div className="flex justify-between w-full items-center">
            <div className="text-gray-700 text-xs">Return Products</div>
            <div>
              <BarChartBig className="text-gray-700 w-4" />
            </div>
          </div>
          <div className="grid justify-start">
            <div className="text-4xl font-bold text-gray-800 text-start">{rtaMetrics.rtaComplete}</div>
          </div>
          <div className="text-xs text-gray-400 text-left">+2 From Last Month</div>
        </div>
        <div className=" border bg-white px-8 py-6 rounded-md shadow-sm space-y-4">
          <div className="flex justify-between w-full items-center">
            <div className="text-gray-700 text-xs">Return Products</div>
            <div>
              <BarChartBig className="text-gray-700 w-4" />
            </div>
          </div>
          <div className="grid justify-start">
            <div className="text-4xl font-bold text-gray-800 text-start">{rtaMetrics.rta}</div>
          </div>
          <div className="text-xs text-gray-400 text-left">+2 From Last Month</div>
        </div>

        {/* Example of duplicated card for RTA Complete, update if necessary */}
      </div>

      {/* Example graph */}
      <div className="flex min-h-full space-x-4">
        <div className="w-[50%] bg-white rounded-md">
          <ChartContainer
            config={chartConfig}
            className="h-[100%] w-full p-6"
          >
            <BarChart
              accessibilityLayer
              data={graphData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#f5f5f5"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="desktop"
                fill={chartConfig.desktop.color}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="mobile"
                fill={chartConfig.mobile.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
        <div className="w-[50%] bg-white rounded-md">
          <ChartContainer
            config={chartConfig}
            className="h-[100%] w-full p-6"
          >
            <BarChart
              accessibilityLayer
              data={graphData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#f5f5f5"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="desktop"
                fill={chartConfig.desktop.color}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="mobile"
                fill={chartConfig.mobile.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
