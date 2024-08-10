import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { useHistoryContext } from "./../historyContext"; // Ensure the correct import
import Loading from "@/components/loading";

const Analysis = ({ data, isEditableAnalysis, formatDate }) => {
  const { signedInfo, loading, error } = useHistoryContext();

  if (loading) return <Loading />;
  if (error) return <div>Error loading history: {error.message}</div>;

  // Set default values to "N/A" if data is not available
  const createdBy = signedInfo.created_by || "N/A";
  const createdAt = signedInfo.created_at ? formatDate(signedInfo.created_at) : "N/A";

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-8">
          {[
            { id: "firmware", label: "Firmware", value: data.firmware },
            { id: "analysis_result", label: "Analysis Result", value: data.analysis_result },
            { id: "root_cause", label: "Root Cause", value: data.root_cause },
            { id: "defect_type", label: "Defect Type", value: data.defect_type },
            { id: "action", label: "Action", value: data.action },
            { id: "verification", label: "Verification", value: data.verification },
          ].map((field) => (
            <div
              key={field.id}
              className="flex items-center space-x-4"
            >
              <Label
                htmlFor={field.id}
                className="w-1/3 text-left"
              >
                {field.label}
              </Label>
              <div className="w-2/3 flex items-center space-x-2">
                <Input
                  id={field.id}
                  defaultValue={field.value}
                  className={`w-full ${!isEditableAnalysis ? "border-none focus-visible:ring-0 focus-visible:ring-offset-0" : ""}`}
                  readOnly={!isEditableAnalysis}
                />
              </div>
            </div>
          ))}
          <div className="my-4 w-full">
            <div className="grid grid-cols-2 gap-4 text-gray-400">
              <div className="flex items-center space-x-4">
                <Label className="text-left">Created At:</Label>
                <div>{createdAt}</div>
              </div>
              <div className="flex items-center space-x-4">
                <Label className="text-left">Created By:</Label>
                <div>{createdBy}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Analysis.propTypes = {
  data: PropTypes.shape({
    firmware: PropTypes.string,
    analysis_result: PropTypes.string,
    root_cause: PropTypes.string,
    defect_type: PropTypes.string,
    action: PropTypes.string,
    verification: PropTypes.string,
  }).isRequired,
  isEditableAnalysis: PropTypes.bool.isRequired,
  handleEdit: PropTypes.func.isRequired,
  formatDate: PropTypes.func.isRequired, // Make sure formatDate is provided
};

export default Analysis;
