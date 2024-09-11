import { useState } from "react";
import PropTypes from "prop-types";
import { Eye, Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useHistoryContext } from "./historyContext";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const ActionButtons = ({ row, userRole, onRefresh }) => {
  const [deleteData, setDeleteData] = useState(null);
  const navigate = useNavigate();
  const { setAnalyzeId } = useHistoryContext();
  const token = localStorage.getItem("token");

  const handleDelete = async (data) => {
    if (!data) return;
    try {
      await axios.delete(`https://api-siexpert.vercel.app/api/returns/${data.retur_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: "Return data has been successfully deleted.",
        variant: "success",
        className: "text-left",
      });
      onRefresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete return data.",
        variant: "destructive",
        className: "text-left",
      });
    } finally {
      setDeleteData(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteData(null);
  };

  const confirmDelete = (data) => {
    setDeleteData(data);
  };

  const handleViewClick = (analyzeId, returnId) => {
    setAnalyzeId(analyzeId);
    navigate(`/data-retur/detail/${returnId}`);
  };

  return (
    <>
      <Eye
        className="text-blue-500 cursor-pointer w-5"
        onClick={() => handleViewClick(row.analysis.analyze_id, row.retur_id)}
      />
      {(userRole === "Admin" || userRole === "Engineer") && (
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash
              className="text-red-500 cursor-pointer w-5"
              onClick={() => confirmDelete(row)}
            />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone. This will permanently delete your data.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(deleteData)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

ActionButtons.propTypes = {
  row: PropTypes.object.isRequired,
  userRole: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default ActionButtons;
