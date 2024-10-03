import PropTypes from "prop-types";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

// Function to generate the PDF document
const generatePDF = async (id) => {
  try {
    // Fetch return data from the API
    const returnResponse = await fetch(`https://api-siexpert.vercel.app/api/returns/${id}`);
    const returnData = await returnResponse.json();
    console.log(returnData);

    // Fetch history data from the API
    const historyResponse = await fetch(`https://api-siexpert.vercel.app/api/history/${id}`);
    const historyData = await historyResponse.json();
    console.log(historyData);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);
    const { height, width } = page.getSize();

    // Set font styles
    const fontSize = 12;
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Function to draw a centered title
    const drawTitle = (text, y) => {
      page.drawText(text, {
        x: (width - boldFont.widthOfTextAtSize(text, 24)) / 2,
        y,
        size: 24,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
    };

    // Function to draw a section title with numbering and bold text
    let sectionNumber = 1;
    const drawSectionTitle = (text, y) => {
      page.drawText(`${sectionNumber}. ${text}`, {
        x: 50,
        y,
        size: fontSize,
        font: boldFont,
        color: rgb(0, 0, 0),
      });
      page.drawLine({
        start: { x: 50, y: y - 10 },
        end: { x: width - 50, y: y - 10 },
        thickness: 1,
        color: rgb(0, 0, 0),
      });
      sectionNumber++;
    };

    // Function to draw text with optional two-column layout
    const drawText = (textLeft, textRight = null, y) => {
      page.drawText(textLeft, {
        x: 50,
        y,
        size: fontSize,
        font: font,
        color: rgb(0, 0, 0),
      });
      if (textRight) {
        page.drawText(textRight, {
          x: width / 2 + 10,
          y,
          size: fontSize,
          font: font,
          color: rgb(0, 0, 0),
        });
      }
    };

    // Drawing the document content
    let yPosition = height - 50;
    drawTitle("ANALYSIS RETURN", yPosition);
    yPosition -= 50;

    // General Information Section
    drawSectionTitle("GENERAL INFORMATION", yPosition);
    yPosition -= 30;
    drawText(`Retur ID: ${returnData.retur_id || "N/A"}`, `Retur No: ${returnData.retur_no || "N/A"}`, yPosition);
    yPosition -= 30;

    // Product Information Section
    drawSectionTitle("PRODUCT INFORMATION", yPosition);
    yPosition -= 30;
    const products = returnData.products || {};
    const families = products.families || {};
    const sectors = families.sectors || {};
    drawText(`Sector Name: ${sectors.sector_name || "N/A"}`, `Family Name: ${families.family_name || "N/A"}`, yPosition);
    yPosition -= 20;
    drawText(`Product ID: ${products.product_id || "N/A"}`, `Product Name: ${products.product_name || "N/A"}`, yPosition);
    yPosition -= 20;
    drawText(`Quantity: ${returnData.qty || "N/A"}`, `Serial No: ${returnData.serial_no || "N/A"}`, yPosition);
    yPosition -= 20;
    drawText(`Issue: ${returnData.issue || "N/A"}`, null, yPosition);
    yPosition -= 30;

    // Customer Information Section
    drawSectionTitle("CUSTOMER INFORMATION", yPosition);
    yPosition -= 30;
    drawText(`Customer Name: ${returnData.customer_name || "N/A"}`, null, yPosition);
    yPosition -= 20;
    drawText(`Country: ${returnData.country || "N/A"}`, null, yPosition);
    yPosition -= 30;

    // Analysis Data Section
    drawSectionTitle("ANALYSIS DATA", yPosition);
    yPosition -= 30;
    const analysis = returnData.analysis || {};
    drawText(`Analysis ID: ${analysis.analyze_id || "N/A"}`, null, yPosition);
    yPosition -= 20;
    drawText(`Verification: ${analysis.verification || "N/A"}`, null, yPosition);
    yPosition -= 20;
    drawText(`Location: ${analysis.location || "N/A"}`, `Root Cause: ${analysis.root_cause || "N/A"}`, yPosition);
    yPosition -= 20;
    drawText(`Defect Type: ${analysis.defect_type || "N/A"}`, null, yPosition);
    yPosition -= 20;
    drawText(`Action: ${analysis.action || "N/A"}`, `Category: ${analysis.category || "N/A"}`, yPosition);
    yPosition -= 30;

    // Save the PDF document and open it in a new window for preview
    const pdfBytes = await pdfDoc.save();
    const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // Open the PDF in a new window for preview
    window.open(pdfUrl, "_blank");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

// Button component to trigger PDF preview
const DownloadButton = ({ id }) => (
  <Button
    onClick={() => generatePDF(id)}
    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white flex gap-2 items-center"
  >
    <Download className="w-5" />
    Preview
  </Button>
);

DownloadButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DownloadButton;
