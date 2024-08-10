import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"; // Import BarChart components
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Utility function to get the last 6 months' names
const getLastSixMonths = () => {
  const now = new Date();
  const months = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(date.toLocaleString("default", { month: "long" }));
  }
  return months;
};

const Graph = () => {
  const lastSixMonths = getLastSixMonths();

  const [graphData1, setGraphData1] = useState(
    lastSixMonths.map((month) => ({
      month,
      rta: Math.floor(Math.random() * 200),
      rtaProgress: Math.floor(Math.random() * 150),
    }))
  );

  const [graphData2, setGraphData2] = useState(
    lastSixMonths.map((month) => ({
      month,
      rtaSubmitted: Math.floor(Math.random() * 100),
      rtaCompleted: Math.floor(Math.random() * 100),
    }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData1((prevData) =>
        prevData.map((item) => ({
          ...item,
          rta: item.rta + Math.floor(Math.random() * 10),
          rtaProgress: item.rtaProgress + Math.floor(Math.random() * 10),
        }))
      );

      setGraphData2((prevData) =>
        prevData.map((item) => ({
          ...item,
          rtaSubmitted: item.rtaSubmitted + Math.floor(Math.random() * 10),
          rtaCompleted: item.rtaCompleted + Math.floor(Math.random() * 10),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const chartConfig1 = {
    rta: {
      label: "Return To Analysis",
      color: "#2563eb",
    },
    rtaProgress: {
      label: "RTA In Progress",
      color: "#60a5fa",
    },
  };

  const chartConfig2 = {
    rtaSubmitted: {
      label: "RTA Submitted",
      color: "#f59e0b",
    },
    rtaCompleted: {
      label: "RTA Completed",
      color: "#10b981",
    },
  };

  return (
    <div className="w-full mt-4">
      <div className="flex max-h-full space-x-4">
        <div className="w-[50%] bg-white rounded-md">
          <ChartContainer
            config={chartConfig1}
            className="h-[100%] w-full p-6"
          >
            <BarChart
              data={graphData1}
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
                dataKey="rta"
                fill={chartConfig1.rta.color}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="rtaProgress"
                fill={chartConfig1.rtaProgress.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>

        <div className="w-[50%] bg-white rounded-md">
          <ChartContainer
            config={chartConfig2}
            className="h-[100%] w-full p-6"
          >
            <BarChart
              data={graphData2}
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
                dataKey="rtaSubmitted"
                fill={chartConfig2.rtaSubmitted.color}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="rtaCompleted"
                fill={chartConfig2.rtaCompleted.color}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Graph;
