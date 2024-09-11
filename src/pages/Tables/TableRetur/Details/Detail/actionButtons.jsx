import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const handleSaveChanges = async (id, data, setIsEditingDetails) => {
  const dataToSubmit = {
    returnData: {
      retur_no: data.retur_no,
      customer_name: data.customer_name,
      country: data.country,
      product_name: data.products?.product_name || "",
      serial_no: data.serial_no,
      issue: data.issue,
    },
  };

  try {
    await axios.put(`https://api-siexpert.vercel.app/api/returns/${id}`, dataToSubmit, {});
    toast({
      title: "Success",
      className: "text-left",
      description: "Changes saved successfully.",
      variant: "success",
    });
    setIsEditingDetails(false);
  } catch (error) {
    console.error("Error saving changes:", error);
    toast({
      title: "Error",
      className: "text-left",
      description: "Failed to save changes.",
      variant: "destructive",
    });
  }
};

export default handleSaveChanges;
