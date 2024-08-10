import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Eye, Trash, Download } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AddDataDialog from "./tambahRetur";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import { Button } from "@/components/ui/button";
import Timeline from "@/components/timeline";
import Loading from "@/components/loading";
import { useUser } from "../TableUsers/userContext";

const TableRetur = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const { role: userRole } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("https://api-siexpert.vercel.app/api/returns", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const returnData = response.data.map((item) => item.returnData);
        setData(returnData);
        setError(null);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (data) => {
    if (!data) return;
    console.log(data.id);
    try {
      await axios.delete(`https://api-siexpert.vercel.app/api/returns/${data.retur_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleRefresh();
    } catch (error) {
      console.error("Error deleting data:", error);
      setError(error);
    } finally {
      setDeleteData(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteData(null);
  };

  const confirmDelete = (data) => {
    setDeleteData(data); // Set data to delete
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "data.xlsx");
  };

  const handleRefresh = () => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError(new Error("No token found"));
        return;
      }

      try {
        const response = await axios.get("https://api-siexpert.vercel.app/api/returns", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
        setError(null);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  };

  if (loading) return <Loading />;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="flex justify-center items-start h-full">
      <div className="p-4 w-full max-w-full">
        <div className="flex justify-between items-center mt-4 ms-4">
          <div className="flex gap-3 items-center">
            <AddDataDialog onRefresh={handleRefresh} />
            <Button
              className="flex gap-1"
              variant="outline"
              onClick={exportToExcel}
            >
              <Download className="w-3 text-left hover:text-gray-500 cursor-pointer" />
              <div className="text-xs">Download</div>
            </Button>
          </div>
        </div>
        <div className="m-4 pb-4 overflow-auto">
          <Table className="w-full p-4">
            <TableCaption>A list of Return.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-center">Retur No</TableHead>
                <TableHead className="text-center">Customer Name</TableHead>
                <TableHead className="text-center">Country</TableHead>
                <TableHead className="text-center">Reference</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-center">Serial No.</TableHead>
                <TableHead className="text-center">Issue</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{row.retur_no}</TableCell>
                    <TableCell className="text-center">{row.customer_name}</TableCell>
                    <TableCell className="text-center">{row.country}</TableCell>
                    <TableCell className="text-center">{row.products.product_name}</TableCell>
                    <TableCell className="text-center">{row.qty}</TableCell>
                    <TableCell className="text-center">{row.serial_no}</TableCell>
                    <TableCell className="text-center">{row.issue}</TableCell>
                    <TableCell className="flex justify-center gap-2">
                      <Link to={`/data-retur/detail/${row.retur_id}`}>
                        <Eye className="text-blue-500 cursor-pointer w-5" />
                      </Link>
                      {userRole === "Admin" && (
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
                      {location.pathname === "/data-retur" && <Timeline analyseId={row.retur_id} />}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-center"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TableRetur;
