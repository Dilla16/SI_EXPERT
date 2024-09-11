import { useState, useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"; // Import BarChart components
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import axios from "axios";

// Fetch data from the API endpoint
const fetchData = async () => {
  try {
    const response = await axios.get("https://api-siexpert.vercel.app/api/histories");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
};

const Graph = () => {
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();

      // Filter months from April to September
      const months = ["Apr 2024", "May 2024", "Jun 2024", "Jul 2024", "Aug 2024", "Sep 2024"];

      const data1Formatted = months.map((month) => ({
        month,
        created: parseInt(data[month]?.created || "0", 10),
        closed: parseInt(data[month]?.closed || "0", 10),
      }));

      const data2Formatted = months.map((month) => ({
        month,
        submitted: parseInt(data[month]?.submitted || "0", 10),
        closed: parseInt(data[month]?.closed || "0", 10),
      }));

      setData1(data1Formatted);
      setData2(data2Formatted);
    };

    getData();
  }, []);

  const chartConfig1 = {
    created: {
      label: "Return to Analysis",
      color: "#2563eb",
    },
    closed: {
      label: "Analysis",
      color: "#60a5fa",
    },
  };

  const chartConfig2 = {
    submitted: {
      label: "Submitted",
      color: "#f59e0b",
    },
    closed: {
      label: "Closed",
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
              data={data1}
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
                dataKey="created"
                fill={chartConfig1.created.color}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="closed"
                fill={chartConfig1.closed.color}
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
              data={data2}
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
                dataKey="submitted"
                fill={chartConfig2.submitted.color}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="closed"
                fill={chartConfig2.closed.color}
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
