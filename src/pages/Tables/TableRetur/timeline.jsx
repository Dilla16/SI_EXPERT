import { useState, useEffect } from "react";
import axios from "axios";
import { History } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import PropTypes from "prop-types";

const formatDate = (timestamp) => {
  if (!timestamp) return "";
  const date = new Date(timestamp);
  return date.toLocaleDateString();
};

const Timeline = ({ retur_id }) => {
  const [timelineData, setTimelineData] = useState([
    { status: "created", date: "", createdBy: "", position: "left", history: {}, caption: "Created", comment: "" },
    { status: "signed", date: "", createdBy: "", position: "right", history: {}, caption: "Signed", comment: "" },
    { status: "submitted", date: "", createdBy: "", position: "left", history: {}, caption: "Submit", comment: "" },
    { status: "rejected", date: "", createdBy: "", position: "right", history: {}, caption: "Rejected", comment: "" },
    { status: "approved", date: "", createdBy: "", position: "left", history: {}, caption: "Approved", comment: "" },
    { status: "closed", date: "", createdBy: "", position: "right", history: {}, caption: "Closed", comment: "" },
  ]);

  const [leadTime, setLeadTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api-siexpert.vercel.app/api/history/${retur_id}`);
        const data = response.data;

        const updatedData = timelineData.map((item) => ({
          ...item,
          date: data[item.status] ? formatDate(data[item.status].created_at) : "",
          createdBy: data[item.status] ? data[item.status].created_by : "",
          history: data[item.status] || {},
          comment: data[item.status]?.comment || "", // Include comment
        }));

        setTimelineData(updatedData);

        // Use leadTime from API response
        const leadTimeFromApi = data.leadTime; // Assume leadTime is directly available in the response
        setLeadTime(leadTimeFromApi);
      } catch (error) {
        console.error("Error fetching history data:", error);
      }
    };

    fetchData();
  }, [retur_id]);

  return (
    <Sheet className="font-poppins bg-success">
      <SheetTrigger asChild>
        <History className="text-gray-400 cursor-pointer w-5" />
      </SheetTrigger>
      <SheetContent className="font-poppins bg-gray-100">
        <SheetHeader>
          <SheetTitle className="text-center font-poppins">HISTORY</SheetTitle>
          <SheetDescription className="text-center font-poppins">Log History Of Return</SheetDescription>
          {leadTime !== null && (
            <SheetDescription className="text-center font-poppins">
              Lead Time: {leadTime} day{leadTime > 1 ? "s" : ""}
            </SheetDescription>
          )}
        </SheetHeader>
        <div className="relative my-4 font-poppins">
          <div className="border-l-2 border-gray-200 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          {timelineData.map((item, index) => {
            const hasData = item.date && item.date !== "" && item.createdBy && item.createdBy !== "N/A";
            let bgColor = "bg-gray-100";
            let borderColor = "border-gray-200";
            let commentClass = ""; // Default class for comments

            if (item.status === "rejected") {
              const rejectedHasData = hasData;
              const approvedHasData = timelineData.find((t) => t.status === "approved")?.date !== "";

              if (rejectedHasData || approvedHasData) {
                bgColor = "bg-red-200"; // Change color for rejected
                borderColor = "border-red-500";
              }
              commentClass = "text-red-600"; // Comment text color for rejected
            } else if (item.status === "approved") {
              if (hasData) {
                bgColor = "bg-green-200"; // Change color for approved
                borderColor = "border-green-500";
              }
              commentClass = "text-green-600"; // Comment text color for approved
            } else if (hasData) {
              bgColor = "bg-green-200";
              borderColor = "border-success";
            }

            return (
              <div
                key={index}
                className={`flex items-center w-full ${item.position === "left" ? "justify-start" : "justify-end"} mb-2`}
              >
                <div className={`w-1/2 ${item.position === "left" ? "pl-1" : "pr-1"} relative`}>
                  <div className={`p-4 space-y-1 rounded-lg shadow-md ${bgColor} border-2 ${borderColor}`}>
                    <div className="flex justify-between items-center gap-2">
                      <h4 className="font-semibold text-sm">{item.caption}</h4>
                      <p className="text-xs">{item.date}</p>
                    </div>
                    <p className="text-xs">{item.createdBy || "N/A"}</p>
                    {/* Only display comment if status is not 'closed' */}
                    {item.status !== "closed" && item.comment && <p className={`text-xs ${commentClass}`}>{item.comment}</p>}
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
  retur_id: PropTypes.string.isRequired,
};

export default Timeline;
