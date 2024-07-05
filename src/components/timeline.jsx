import { History } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import PropTypes from "prop-types";

const Timeline = () => {
  const timelineData = [
    { status: "registered", date: "2023-01-01", position: "left" },
    { status: "assign", date: "2023-01-02", position: "right" },
    { status: "completed", date: "2023-01-03", position: "left" },
    { status: "submitted", date: "2023-01-04", position: "right" },
    { status: "approved", date: "2023-01-05", position: "left" },
    { status: "closed", date: "2023-01-06", position: "right" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <History className="text-gray-400 cursor-pointer w-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-center">Timeline</SheetTitle>
          <SheetDescription className="text-center">See Timeline of analyzing</SheetDescription>
        </SheetHeader>
        <div className="relative my-6">
          <div className="border-l-2 border-gray-200 absolute h-full left-1/2 transform -translate-x-1/2"></div>
          {timelineData.map((item, index) => (
            <div
              key={index}
              className={`flex items-center w-full ${item.position === "left" ? "justify-start" : "justify-end"} mb-8`}
            >
              <div className={`w-1/2 ${item.position === "left" ? "pl-8" : "pr-8"} relative`}>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h4 className="font-bold text-sm">{item.status.charAt(0).toUpperCase() + item.status.slice(1)}</h4>
                  <p className="text-xs">{item.date}</p>
                </div>
                <div className={`absolute top-1/2 transform -translate-y-1/2 ${item.position === "left" ? "-left-4" : "-right-4"}`}>
                  <div className="h-8 w-8 bg-gray-100 rounded-full border-2 border-gray-200"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

Timeline.propTypes = {
  timelineData: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
    })
  ),
};

export default Timeline;
