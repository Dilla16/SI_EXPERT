import { useState } from "react";
import { Button } from "@/components/ui/button";
import PropTypes from "prop-types";
import { toast } from "@/components/ui/use-toast";
import useAnalysisData from "./analysisData";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import DownloadButton from "./generatePDF";
import { useParams } from "react-router-dom";

const ActionButtons = ({ handleSave, role, canEdit, haveSubmitted, signed, approved, rejected, isEditingAnalysis, setIsEditingAnalysis, returId, data }) => {
  const { id: retur_id } = useParams();
  const { handleStartAnalysis, handleSubmitAnalysis, handleApprove, handleReject, refreshData } = useAnalysisData({
    id: returId,
    isEditingAnalysis,
    setIsEditingAnalysis,
    data,
    toast,
  });

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [comment, setComment] = useState(""); // State for comment
  const [images, setImages] = useState([{ image: null, caption: "" }]);
  const [dialogType, setDialogType] = useState("");

  const handleStartClick = async () => {
    try {
      await handleStartAnalysis();
      await refreshData(); // Refresh data after starting the analysis
    } catch (error) {
      console.error("Error starting analysis:", error);
    }
  };

  const handleSubmitClick = async () => {
    try {
      await handleSubmitAnalysis();
    } catch (error) {
      console.error("Error submitting analysis:", error);
    }
  };

  const handleAddImage = () => {
    if (images.length < 3) {
      setImages([...images, { image: null, caption: "" }]);
    }
  };

  const handleImageChange = (index, image) => {
    const newImages = [...images];
    newImages[index].image = image;
    setImages(newImages);
  };

  const handleCaptionChange = (index, caption) => {
    const newImages = [...images];
    newImages[index].caption = caption;
    setImages(newImages);
  };

  const handleSaveImages = () => {
    // Add functionality to save images and captions
    setDialogOpen(false);
  };

  const handleCancelEdit = () => {
    setImages([{ image: null, caption: "" }]);
    setDialogOpen(false);
    setIsEditingAnalysis(false);
  };

  const openApprovalDialog = () => {
    setDialogType("approve");
    setDialogOpen(true);
  };

  const openRejectionDialog = () => {
    setDialogType("reject");
    setDialogOpen(true);
  };

  const confirmDecision = async () => {
    try {
      if (dialogType === "approve") {
        await handleApprove(comment); // Pass comment to handleApprove
      } else if (dialogType === "reject") {
        await handleReject(comment); // Pass comment to handleReject
      }
      setComment(""); // Clear the comment after submission
      setDialogOpen(false);
      setIsEditingAnalysis(false); // Optionally reset editing state
      toast({ description: `${dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} successfully.` });
    } catch (error) {
      console.error(`Error ${dialogType} analysis:`, error);
      toast({ title: "Error", description: `Failed to ${dialogType}.`, variant: "destructive" });
    }
  };

  const renderUserButtons = () => {
    if (role === "User") {
      if (signed !== true && haveSubmitted !== true) {
        return (
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleStartClick}
              className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white"
            >
              Start Analysis
            </Button>
          </div>
        );
      } else if ((rejected === true && approved !== true) || (canEdit === true && signed === true && haveSubmitted !== true && approved !== true)) {
        return (
          <div className="flex flex-col items-center gap-4 mt-4">
            <div className="flex gap-4 mt-10">
              <Button
                onClick={() => {
                  if (isEditingAnalysis) {
                    handleSave();
                  } else {
                    setIsEditingAnalysis(true);
                  }
                }}
                className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white"
              >
                {isEditingAnalysis ? "Save Analysis" : "Fill Analysis"}
              </Button>
              {!isEditingAnalysis && (
                <Button
                  onClick={handleSubmitClick}
                  className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white"
                >
                  Submit Analysis
                </Button>
              )}
              {isEditingAnalysis && (
                <>
                  {/* <Button
                    onClick={() => setDialogOpen(true)}
                    className="bg-gray-500 hover:bg-gray-600 px-4 py-2 text-white"
                  >
                    Upload Images
                  </Button> */}
                  <Button
                    onClick={handleCancelEdit}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white"
                  >
                    Cancel
                  </Button>
                </>
              )}
            </div>
            <Dialog
              open={isDialogOpen}
              onOpenChange={setDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Images</DialogTitle>
                </DialogHeader>
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="mb-4"
                  >
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e.target.files[0])}
                    />
                    <Textarea
                      placeholder="Enter image caption"
                      value={img.caption}
                      onChange={(e) => handleCaptionChange(index, e.target.value)}
                      className="mt-2"
                    />
                  </div>
                ))}
                {images.length < 3 && (
                  <Button
                    onClick={handleAddImage}
                    variant="secondary"
                    className="mb-4"
                  >
                    Add Another Image
                  </Button>
                )}
                <DialogFooter>
                  <Button onClick={handleSaveImages}>Save Images</Button>
                  <Button
                    onClick={handleCancelEdit}
                    variant="secondary"
                    className="ml-4"
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        );
      }
    }
    return null;
  };

  const renderEngineerButtons = () => {
    if (role === "Engineer") {
      return (
        <div className="flex justify-center items-center gap-4 mt-4">
          <DownloadButton id={retur_id} />
          {haveSubmitted === true && approved !== true && (
            <>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    onClick={openApprovalDialog}
                    className="bg-success hover:bg-green-600 px-4 py-2 text-white"
                  >
                    Approve
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Approve Analysis</AlertDialogTitle>
                    <AlertDialogDescription>Please provide a comment for the approval.</AlertDialogDescription>
                    <Textarea
                      placeholder="Enter your comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-2"
                    />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={confirmDecision}
                      className="bg-success hover:bg-green-600"
                    >
                      Approve Analyze
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button
                    onClick={openRejectionDialog}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white"
                  >
                    Reject
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Reject Analysis</AlertDialogTitle>
                    <AlertDialogDescription>Please provide a comment for the rejection.</AlertDialogDescription>
                    <Textarea
                      placeholder="Enter your comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="mt-2"
                    />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={confirmDecision}
                      className="bg-red-500 hover:bg-red-600"
                    >
                      Reject Analysis
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      {renderUserButtons()}
      {renderEngineerButtons()}
    </div>
  );
};

ActionButtons.propTypes = {
  role: PropTypes.string.isRequired,
  canEdit: PropTypes.bool.isRequired,
  haveSubmitted: PropTypes.bool.isRequired,
  signed: PropTypes.bool.isRequired,
  approved: PropTypes.bool.isRequired,
  rejected: PropTypes.bool.isRequired,
  isEditingAnalysis: PropTypes.bool.isRequired,
  setIsEditingAnalysis: PropTypes.func.isRequired,
  returId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default ActionButtons;
