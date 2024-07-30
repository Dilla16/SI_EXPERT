import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trash, Download } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import TambahProducts from "./tambahProduct";
import TableSectors from "./sectors/setTableSectors";
import TableFamilies from "./families/setTableFamilies";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import Timeline from "@/components/timeline";
import Loading from "@/components/loading";
import EditProduk from "./editProduct";
import { toast } from "@/components/ui/use-toast";

const TableProduct = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch products
        const productResponse = await axios.get("https://api-siexpert.vercel.app/api/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(productResponse.data);

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

  const handleDelete = async (product) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`https://api-siexpert.vercel.app/api/products/${product.product_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(data.filter((item) => item.product_id !== product.product_id));
      toast({
        title: "Success",
        description: "Product has been deleted successfully.",
        variant: "success",
        className: "text-left",
      });
      setDeleteData(null);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product.",
        variant: "destructive",
        className: "text-left",
      });
      setError(error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteData(null);
  };

  const confirmDelete = (product) => {
    setDeleteData(product);
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
        // Refresh products
        const response = await axios.get("https://api-siexpert.vercel.app/api/products", {
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
            <TambahProducts
              type="data-products"
              onRefresh={handleRefresh}
            />
            <Button
              className="flex gap-1"
              variant="outline"
              onClick={exportToExcel}
            >
              <Download className="w-3 text-left hover:text-gray-500 cursor-pointer" />
              <div className="text-xs">Download</div>
            </Button>
          </div>
          <div>
            <TableSectors
              type="data-sectors"
              onRefresh={handleRefresh}
            />
            <TableFamilies
              type="data-families"
              onRefresh={handleRefresh}
            />
          </div>
        </div>
        <div className="m-4">
          <Table className="w-full p-4">
            <TableCaption>List of products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-center">Sector</TableHead>
                <TableHead className="text-center">Family</TableHead>
                <TableHead className="text-center">Product Code</TableHead>
                <TableHead className="text-center">Product Name</TableHead>
                <TableHead className="text-center">Created By</TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{row.sector.sector_name}</TableCell>
                    <TableCell className="text-center">{row.family.family_name}</TableCell>
                    <TableCell className="text-center">{row.product_id}</TableCell>
                    <TableCell className="text-center">{row.product_name}</TableCell>
                    <TableCell className="text-center">{row.created_by}</TableCell>
                    <TableCell className="text-center">{row.created_at}</TableCell>
                    <TableCell className="text-center justify-center flex gap-2">
                      <EditProduk
                        product_id={row.product_id}
                        onRefresh={handleRefresh}
                      />
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
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
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

export default TableProduct;
