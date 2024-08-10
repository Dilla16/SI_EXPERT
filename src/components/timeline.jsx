/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import { History } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import PropTypes from "prop-types";

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString(); // Formats date to "MM/DD/YYYY"
};

const Timeline = ({ analyseId }) => {
  const [timelineData, setTimelineData] = useState([
    { status: "created", date: "", createdBy: "", position: "left", history: {} },
    { status: "signed", date: "", createdBy: "", position: "right", history: {} },
    { status: "completed", date: "", createdBy: "", position: "left", history: {} },
    { status: "submitted", date: "", createdBy: "", position: "right", history: {} },
    { status: "approved", date: "", createdBy: "", position: "left", history: {} },
    { status: "closed", date: "", createdBy: "", position: "right", history: {} },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api-siexpert.vercel.app/api/history/${analyseId}`);
        const data = response.data;

        // Update timelineData with fetched data
        const updatedData = timelineData.map((item) => ({
          ...item,
          date: data[item.status] ? formatDate(data[item.status].created_at) : "",
          createdBy: data[item.status] ? data[item.status].created_by : "",
          history: data[item.status] || {},
        }));

        setTimelineData(updatedData);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchData();
  }, [analyseId]);

  return (
    <Sheet className=" font-poppins bg-success">
      <SheetTrigger asChild>
        <History className="text-gray-400 cursor-pointer w-5" />
      </SheetTrigger>
      <SheetContent className=" font-poppins bg-gray-100">
        <SheetHeader>
          <SheetTitle className="text-center font-poppins">Timeline</SheetTitle>
          <SheetDescription className="text-center font-poppins">See Timeline of analyzing</SheetDescription>
        </SheetHeader>
        <div className="relative my-6 font-poppins">
          <div className="border-l-2 border-gray-200 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          {timelineData.map((item, index) => {
            const hasData = item.date && item.date !== "" && item.createdBy && item.createdBy !== "N/A";
            return (
              <div
                key={index}
                className={`flex items-center w-full ${item.position === "left" ? "justify-start" : "justify-end"} mb-8`}
              >
                <div className={`w-1/2 ${item.position === "left" ? "pl-2" : "pr-2"} relative`}>
                  <div className={`p-4 space-y-1 rounded-lg shadow-md ${hasData ? "bg-green-200 border-success" : "bg-gray-100 border-gray-200"}`}>
                    <div className="flex justify-between items-center gap-2">
                      <h4 className="font-semibold text-sm">{item.status.charAt(0).toUpperCase() + item.status.slice(1) + "\u00A0:"}</h4>
                      <p className="text-xs">{item.date}</p>
                    </div>

                    <p className="text-xs ">{item.createdBy || "N/A"}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
};

Timeline.propTypes = {
  analyseId: PropTypes.string.isRequired,
};

export default Timeline;
