import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";

const ExportToExcel = ({ data }) => {
  const exportToExcel = () => {
    // Transform the data to include return details and their associated analysis
    const transformedData = data.map((item) => ({
      ReturID: item.returnData.retur_id,
      ReturNo: item.returnData.retur_no,
      CustomerName: item.returnData.customer_name,
      Country: item.returnData.country,
      ProductName: item.returnData.product_name,
      Qty: item.returnData.qty,
      SerialNo: item.returnData.serial_no,
      Issue: item.returnData.issue,
      AnalyzeID: item.returnData.analysis.analyze_id,
      RootCause: item.returnData.analysis.root_cause,
      DefectType: item.returnData.analysis.defect_type,
      Action: item.returnData.analysis.action,
      Verification: item.returnData.analysis.verification,
      Status: item.status,
    }));

    // Create a worksheet from the transformed data
    const ws = XLSX.utils.json_to_sheet(transformedData);
    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Get the current date and time for the filename
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}_${now.getHours().toString().padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}-${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}`;

    // Generate filename with timestamp
    const filename = `data_${timestamp}.xlsx`;

    // Write the workbook to a file with the generated filename
    XLSX.writeFile(wb, filename);
  };

  return (
    <Button
      className="flex gap-1"
      variant="outline"
      onClick={exportToExcel}
    >
      <Download className="w-3 text-left hover:text-gray-500 cursor-pointer" />
      <div className="text-xs">Download</div>
    </Button>
  );
};

ExportToExcel.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ExportToExcel;
