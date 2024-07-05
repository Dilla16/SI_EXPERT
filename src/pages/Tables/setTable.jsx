import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Eye, Trash, Download } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import SearchData from "@/components/search";
import AddDataDialog from "@/components/TambahData";
import * as XLSX from "xlsx"; // import XLSX for Excel export
import { Button } from "@/components/ui/button";
import Timeline from "@/components/timeline";

const TableData = () => {
  const location = useLocation();
  const [deleteData, setDeleteData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const pages = {
    "/data-user": {
      caption: "A list of users.",
      headers: ["No", "Sesa", "Name", "Email", "Role", "Level", "Created By", "Created At", "Actions"],
      data: [
        {
          id: 1,
          sesa: "123",
          name: "John Doe",
          email: "john.doe@example.com",
          role: "Admin",
          level: "1",
          createdBy: "Admin",
          createdAt: "2023-01-01",
        },
        {
          id: 2,
          sesa: "456",
          name: "Jane Smith",
          email: "jane.smith@example.com",
          role: "User",
          level: "2",
          createdBy: "Admin",
          createdAt: "2023-01-02",
        },
      ],
    },
    "/data-produk": {
      caption: "A list of products.",
      headers: ["No", "Product Code", "Family", "Reference", "Created By", "Created At", "Actions"],
      data: [
        {
          id: 1,
          productCode: "P001",
          family: "Electronics",
          reference: "REF001",
          createdBy: "Admin",
          createdAt: "2023-01-01",
        },
        {
          id: 2,
          productCode: "P002",
          family: "Furniture",
          reference: "REF002",
          createdBy: "Admin",
          createdAt: "2023-01-02",
        },
      ],
    },
    "/data-retur": {
      caption: "A list of returns.",
      headers: ["No", "Retur No", "Customer Name", "Country", "Product Code", "Qty", "Actions"],
      data: [
        {
          id: 1,
          returNo: "R001",
          customerName: "John Doe",
          country: "USA",
          productCode: "P001",
          qty: 5,
        },
        {
          id: 2,
          returNo: "R002",
          customerName: "Jane Smith",
          country: "Canada",
          productCode: "P002",
          qty: 3,
        },
      ],
    },
  };

  const currentPage = pages[location.pathname] || pages["/data-user"]; // Default to /data-user if not matched

  const handleDelete = (data) => {
    console.log("Deleting data:", data);
    // Implement your delete logic here
    setDeleteData(null); // Clear delete data after handling
  };

  const handleCancelDelete = () => {
    setDeleteData(null); // Clear delete data
  };

  const confirmDelete = (data) => {
    setDeleteData(data); // Set data to delete
  };

  const filteredData = currentPage.data.filter((item) => Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())));

  const exportToExcel = () => {
    // Convert data to Excel format
    const ws = XLSX.utils.json_to_sheet(currentPage.data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    // Save the file
    XLSX.writeFile(wb, "data.xlsx");
  };

  return (
    <div className="flex justify-center items-start h-full ms-4">
      <div className="bg-white p-4 rounded shadow-md w-full max-w-full">
        <div className="flex justify-between items-center mt-4 mb-6 me-4">
          <SearchData
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
          <div className="flex gap-3 items-center">
            <AddDataDialog type="data-user" />
            <Button
              className="flex gap-1"
              variant="outline"
              onClick={exportToExcel}
            >
              <Download className="w-3 text-left hover:text-gray-500 cursor-pointer" />
              <div className=" text-xs">Download</div>
            </Button>
          </div>
        </div>
        <Table className="w-full">
          <TableCaption>{currentPage.caption}</TableCaption>
          <TableHeader>
            <TableRow>
              {currentPage.headers.map((header, index) => (
                <TableHead
                  key={index}
                  className="text-left"
                >
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={index}>
                {Object.keys(row).map((key, index) => (
                  <TableCell
                    key={index}
                    className="text-left"
                  >
                    {row[key]}
                  </TableCell>
                ))}
                <TableCell className="text-left flex gap-2">
                  <Eye className="text-blue-500 cursor-pointer w-5" />
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
                  {location.pathname === "/data-retur" && <Timeline />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableData;
