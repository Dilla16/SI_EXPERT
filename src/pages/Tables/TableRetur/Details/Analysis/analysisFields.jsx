import PropTypes from "prop-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const AnalysisFields = ({ data, isEditingAnalysis, setDataAnalysis }) => {
  const handleChange = (id, value) => {
    setDataAnalysis((prevData) => ({
      ...prevData,
      [id]: value.toUpperCase(),
    }));
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        {/* Verification Field */}
        <div className="flex flex-col mb-4 w-full">
          <Label
            htmlFor="verification"
            className="text-left mb-2"
          >
            Verification
          </Label>
          <Input
            id="verification"
            value={data?.verification || ""}
            className={`w-full ${!isEditingAnalysis ? "border-none focus-visible:ring-0 focus-visible:ring-offset-0" : "border border-gray-300"}`}
            readOnly={!isEditingAnalysis}
            onChange={(e) => handleChange("verification", e.target.value)}
          />
        </div>

        {/* Location Field */}
        <div className="flex flex-col mb-4 w-full">
          <Label
            htmlFor="location"
            className="text-left mb-2"
          >
            Location
          </Label>
          <Input
            id="location"
            value={data?.location || ""}
            className={`w-full ${!isEditingAnalysis ? "border-none focus-visible:ring-0 focus-visible:ring-offset-0" : "border border-gray-300"}`}
            readOnly={!isEditingAnalysis}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>

        {/* Root Cause Field */}
        <div className="flex flex-col mb-4 w-full">
          <Label
            htmlFor="root_cause"
            className="text-left mb-2"
          >
            Root Cause
          </Label>
          <Input
            id="root_cause"
            value={data?.root_cause || ""}
            className={`w-full ${!isEditingAnalysis ? "border-none focus-visible:ring-0 focus-visible:ring-offset-0" : "border border-gray-300"}`}
            readOnly={!isEditingAnalysis}
            onChange={(e) => handleChange("root_cause", e.target.value)}
          />
        </div>

        {/* Defect Type Field */}
        <div className="flex flex-col mb-4 w-full">
          <Label
            htmlFor="defect_type"
            className="text-left mb-2"
          >
            Defect Type
          </Label>
          <Input
            id="defect_type"
            value={data?.defect_type || ""}
            className={`w-full ${!isEditingAnalysis ? "border-none focus-visible:ring-0 focus-visible:ring-offset-0" : "border border-gray-300"}`}
            readOnly={!isEditingAnalysis}
            onChange={(e) => handleChange("defect_type", e.target.value)}
          />
        </div>

        {/* Action Field */}
        <div className="flex flex-col mb-4 w-full">
          <Label
            htmlFor="action"
            className="text-left mb-2"
          >
            Action
          </Label>
          <Select
            id="action"
            value={data?.action || ""}
            onValueChange={(value) => handleChange("action", value)}
            disabled={!isEditingAnalysis}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FAILURE ANALYSIS">FAILURE ANALYSIS</SelectItem>
              <SelectItem value="CORRECTIVE ACTION ANALYSIS">CORRECTIVE ACTION ANALYSIS</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Field */}
        <div className="flex flex-col mb-4 w-full">
          <Label
            htmlFor="category"
            className="text-left mb-2"
          >
            Category
          </Label>
          <Select
            id="category"
            value={data?.category || ""}
            onValueChange={(value) => handleChange("category", value)}
            disabled={!isEditingAnalysis}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SUPPLIER">SUPPLIER</SelectItem>
              <SelectItem value="MANUFACTURING">MANUFACTURING</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

AnalysisFields.propTypes = {
  data: PropTypes.shape({
    verification: PropTypes.string,
    location: PropTypes.string,
    root_cause: PropTypes.string,
    defect_type: PropTypes.string,
    action: PropTypes.string,
    category: PropTypes.string,
  }).isRequired,
  isEditingAnalysis: PropTypes.bool.isRequired,
  setDataAnalysis: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default AnalysisFields;
