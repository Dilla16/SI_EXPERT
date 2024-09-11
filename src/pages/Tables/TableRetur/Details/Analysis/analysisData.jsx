import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const useAnalysisData = ({ id, isEditingAnalysis, setIsEditingAnalysis, toast }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [canEdit, setCanEdit] = useState(null);
  const [haveSubmitted, setHaveSubmitted] = useState(null);
  const [approved, setApproved] = useState(null);
  const [rejected, setRejected] = useState(null);
  const [signed, setSigned] = useState(false);
  const [analyzeId, setAnalyzeId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchReturnData = useCallback(async () => {
    try {
      const response = await axios.get(`https://api-siexpert.vercel.app/api/returns/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAnalyzeId(response.data.analysis.analyze_id);
    } catch (error) {
      console.error("Error fetching return data:", error);
      setError(error);
    }
  }, [id, token]);

  const fetchAnalysisData = useCallback(async () => {
    if (analyzeId) {
      try {
        const response = await axios.get(`https://api-siexpert.vercel.app/api/analysis/${analyzeId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(error);
        console.error("Error fetching analysis data:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [analyzeId, token]);

  const fetchStatusData = useCallback(async () => {
    if (analyzeId) {
      try {
        const statusResponse = await axios.get(`https://api-siexpert.vercel.app/api/retur/analysis/status/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCanEdit(statusResponse.data.canEdit);
        setHaveSubmitted(statusResponse.data.haveSubmitted);
        setSigned(statusResponse.data.signed);
        setApproved(statusResponse.data.approved);
        setRejected(statusResponse.data.rejected);
      } catch (error) {
        console.error("Error fetching status data:", error);
        setError(error);
      }
    }
  }, [analyzeId, id, token]);

  useEffect(() => {
    fetchReturnData();
  }, [fetchReturnData]);

  useEffect(() => {
    fetchAnalysisData();
    fetchStatusData();
  }, [fetchAnalysisData, fetchStatusData]);

  const refreshData = useCallback(async () => {
    await fetchAnalysisData(); // Re-fetch analysis data
    await fetchStatusData(); // Re-fetch status data
  }, [fetchAnalysisData, fetchStatusData]);

  const handleStartAnalysis = async () => {
    if (!analyzeId) return;

    try {
      await axios.post(
        `https://api-siexpert.vercel.app/api/retur/analysis/assign/${analyzeId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast({
        title: "Success",
        className: "text-left",
        description: "Successfully started analysis.",
        variant: "success",
      });
      setIsEditingAnalysis(true);
      refreshData();
    } catch (error) {
      console.error("Error starting analysis:", error);
      toast({
        title: "Error",
        className: "text-left",
        description: "Failed to start analysis.",
        variant: "destructive",
      });
    }
  };

  const handleSaveAnalysis = async () => {
    if (!isEditingAnalysis || !analyzeId) return;
    console.log(data);

    try {
      const updatedData = {
        verification: data?.verification,
        root_cause: data?.root_cause,
        defect_type: data?.defect_type,
        action: data?.action,
        location: data?.location,
        category: data?.category,
        images: data?.images,
        caption: data?.caption,
      };

      console.log(updatedData);

      await axios.put(
        `https://api-siexpert.vercel.app/api/analysis/${id}`,
        { analysisData: updatedData },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast({
        title: "Success",
        className: "text-left",
        description: "Analysis data saved successfully.",
        variant: "success",
      });
      setIsEditingAnalysis(false);
      refreshData();
    } catch (error) {
      console.error("Error saving analysis data:", error);
      toast({
        title: "Error",
        className: "text-left",
        description: "Failed to save analysis data.",
        variant: "destructive",
      });
    }
  };

  const handleSubmitAnalysis = async () => {
    if (!analyzeId) return;

    try {
      await axios.post(
        `https://api-siexpert.vercel.app/api/retur/analysis/submitted/${analyzeId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast({
        title: "Success",
        className: "text-left",
        description: "Analysis submitted successfully.",
        variant: "success",
      });
      setIsEditingAnalysis(false);
      refreshData();
    } catch (error) {
      console.error("Error submitting analysis:", error);
      toast({
        title: "Error",
        className: "text-left",
        description: "Failed to submit analysis.",
        variant: "destructive",
      });
    }
  };

  const handleApprove = async (comment) => {
    if (!analyzeId) return;

    try {
      await axios.post(
        `https://api-siexpert.vercel.app/api/retur/analysis/decision/${analyzeId}`,
        { decision: "approved", comment }, // Include comment in the request body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast({
        title: "Success",
        className: "text-left",
        description: "Analysis approved successfully.",
        variant: "success",
      });
      refreshData(); // Refresh data after approval
    } catch (error) {
      console.error("Error approving analysis:", error);
      toast({
        title: "Error",
        className: "text-left",
        description: "Failed to approve analysis.",
        variant: "destructive",
      });
    }
  };

  const handleReject = async (comment) => {
    if (!analyzeId) return;

    try {
      await axios.post(
        `https://api-siexpert.vercel.app/api/retur/analysis/decision/${analyzeId}`,
        { decision: "rejected", comment }, // Include comment in the request body
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast({
        title: "Success",
        className: "text-left",
        description: "Analysis rejected successfully.",
        variant: "success",
      });
      refreshData(); // Refresh data after rejection
    } catch (error) {
      console.error("Error rejecting analysis:", error);
      toast({
        title: "Error",
        className: "text-left",
        description: "Failed to reject analysis.",
        variant: "destructive",
      });
    }
  };

  return {
    data,
    loading,
    error,
    canEdit,
    haveSubmitted,
    signed,
    approved,
    rejected,
    analyzeId,
    handleStartAnalysis,
    handleSaveAnalysis,
    handleSubmitAnalysis,
    handleApprove,
    handleReject,
    setData,
  };
};

export default useAnalysisData;
