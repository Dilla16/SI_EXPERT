import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DetailRetur from "./Detail/detailRetur";
import Analysis from "./Analysis/analysisRetur";
import Loading from "@/components/loading";
import HistoryProvider, { useHistoryContext } from "./historyContext"; // Ensure correct import
import { useUser } from "../TableUsers/userContext";
import { toast } from "@/components/ui/use-toast";

const MainDetail = () => {
  const { id } = useParams();
  const { role, sesa } = useUser();
  const { history } = useHistoryContext();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditableDetails, setIsEditableDetails] = useState(false);
  const [isEditableAnalysis, setIsEditableAnalysis] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [analyzeId, setAnalyzeId] = useState(null); // State for analyze_id
  const [buttonText, setButtonText] = useState("Start Analysis"); // State for button text

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const returnResponse = await axios.get(`https://api-siexpert.vercel.app/api/returns/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(returnResponse.data);
        setError(null);
        setAnalyzeId(returnResponse.data.analysis.analyze_id);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (Array.isArray(history)) {
      const signedHistory = history.find((entry) => entry.status === "signed");
      if (signedHistory && signedHistory.created_by === sesa) {
        setButtonText("Fill Analysis");
      } else {
        setButtonText("Start Analysis");
      }
    } else {
      console.error("History data is not an array:", history);
    }
  }, [history, sesa]);

  const handleStartAnalysis = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.post("https://api-siexpert.vercel.app/api/retur/analysis/assign", { analyze_id: analyzeId }, { headers: { Authorization: `Bearer ${token}` } });
      toast({
        title: "Success",
        className: "text-left",
        description: "Successfully started analysis.",
        variant: "success",
      });
      setActiveTab("analysis"); // Switch to the Analysis tab
      // Update button text here if needed
      setButtonText("Fill Analysis"); // Change button text after successful start
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

  if (loading) return <Loading />;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const handleEdit = (tab) => {
    if (tab === "details") {
      setIsEditableDetails(!isEditableDetails);
    } else if (tab === "analysis") {
      setIsEditableAnalysis(!isEditableAnalysis);
    }
  };

  return (
    <HistoryProvider id={id}>
      <div className="flex flex-col h-full p-4">
        <div className="flex-grow">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value)}
            className="max-w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
            </TabsList>
            <TabsContent value="details">
              <DetailRetur
                data={data}
                isEditableDetails={isEditableDetails}
                handleEdit={handleEdit}
                formatDate={(date) => new Intl.DateTimeFormat("id-ID").format(new Date(date))}
              />
            </TabsContent>
            <TabsContent value="analysis">
              <Analysis
                data={data}
                isEditableAnalysis={isEditableAnalysis}
                handleEdit={handleEdit}
                formatDate={(date) => new Intl.DateTimeFormat("id-ID").format(new Date(date))}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex justify-center gap-4">
          {isEditableDetails && (
            <Button
              onClick={() => handleEdit("details")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save changes
            </Button>
          )}
          {isEditableAnalysis && (
            <Button
              onClick={() => handleEdit("analysis")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Save changes
            </Button>
          )}
          {role === "User" && (
            <Button
              onClick={handleStartAnalysis}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </HistoryProvider>
  );
};

export default MainDetail;
