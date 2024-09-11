import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
// import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/loading";
import useAnalysisData from "./analysisData";
import AnalysisFields from "./analysisFields";
import ActionButtons from "./actionButtons";

import { toast } from "@/components/ui/use-toast";

const Analysis = ({ isEditingAnalysis, setIsEditingAnalysis, role }) => {
  const { id } = useParams();
  // const toast = useToast();

  const { data, loading, error, canEdit, haveSubmitted, signed, approved, rejected, handleStartAnalysis, handleSaveAnalysis, handleSubmitAnalysis, setData } = useAnalysisData({
    id,
    isEditingAnalysis,
    setIsEditingAnalysis,
    toast,
  });

  if (loading) return <Loading />;
  if (error) return <div>Error fetching analysis data: {error.message}</div>;

  // Function to handle saving the analysis data
  const handleSave = async () => {
    try {
      await handleSaveAnalysis(); // Calls the save function from the hook
      toast({
        title: "Success",
        description: "Product has been deleted successfully.",
        variant: "success",
        className: "text-left",
      });
    } catch (err) {
      // toast({
      //   title: "Error",
      //   className: "text-left",
      //   description: `Failed to save analysis data: ${err.message}`,
      //   variant: "destructive",
      // });
    }
  };

  return (
    <div className="p-6 space-y-4">
      {/* <Toaster /> */}
      <AnalysisFields
        data={data}
        isEditingAnalysis={isEditingAnalysis}
        canEdit={canEdit}
        haveSubmitted={haveSubmitted}
        signed={signed}
        setDataAnalysis={setData}
      />
      <div className="flex gap-4  justify-center mt-4">
        {/* {isEditingAnalysis && (
          <button
            onClick={handleSave}
            className="p-2 bg-green-500 text-white rounded"
          >
            Save Changes
          </button>
        )} */}
        <ActionButtons
          role={role}
          canEdit={canEdit}
          haveSubmitted={haveSubmitted}
          signed={signed}
          approved={approved}
          rejected={rejected}
          isEditingAnalysis={isEditingAnalysis}
          setIsEditingAnalysis={setIsEditingAnalysis}
          returId={id}
          handleSave={handleSave}
          handleStartAnalysis={handleStartAnalysis}
          handleSaveAnalysis={handleSaveAnalysis}
          handleSubmitAnalysis={handleSubmitAnalysis}
        />
      </div>
    </div>
  );
};

Analysis.propTypes = {
  isEditingAnalysis: PropTypes.bool.isRequired,
  setIsEditingAnalysis: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
};

export default Analysis;
