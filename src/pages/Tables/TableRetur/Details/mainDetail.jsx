import { useState } from "react";
import { useParams } from "react-router-dom";
import DetailRetur from "./Detail/detailRetur";
import Analysis from "./Analysis/analysisRetur";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "../../TableUsers/userContext";

const MainDetail = () => {
  const { id } = useParams();
  const { role } = useUser();
  const [isEditingDetails, setIsEditingDetails] = useState(false);
  const [isEditingAnalysis, setIsEditingAnalysis] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  return (
    <div className="flex flex-col max-h-screen p-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex-grow"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Return Details</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="ps-10 pe-10">
            <DetailRetur
              id={id}
              isEditable={isEditingDetails}
              setIsEditingDetails={setIsEditingDetails}
              role={role}
            />
          </div>
        </TabsContent>
        <TabsContent value="analysis">
          <div className="ps-10 pe-10">
            <Analysis
              id={id}
              isEditingAnalysis={isEditingAnalysis}
              setIsEditingAnalysis={setIsEditingAnalysis}
              role={role}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainDetail;
