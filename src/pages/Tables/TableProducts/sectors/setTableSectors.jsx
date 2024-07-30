import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LayoutList, Trash } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import TambahSector from "./tambahSectors";

const TableSectors = () => {
  const [sectors, setSectors] = useState([]);
  const [error, setError] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const fetchSectors = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("https://api-siexpert.vercel.app/api/sectors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSectors(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  const handleDelete = async (sector_id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`https://api-siexpert.vercel.app/api/sectors/${sector_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: "Sector has been successfully deleted.",
        variant: "success",
        className: "text-left",
      });
      fetchSectors();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete sector.",
        variant: "destructive",
        className: "text-left",
      });
      console.error("Error deleting sector:", error);
    } finally {
      setDeleteData(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteData(null);
  };

  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Button
            className="flex gap-1 h-8 me-4"
            variant="outline"
          >
            <LayoutList className="w-4" />
            <div className="text-xs">Data Sector</div>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader className="my-2">
          <DialogTitle className="text-center font-bold">DATA SECTORS</DialogTitle>
        </DialogHeader>
        <Table className="w-full mt-4 mb-4">
          <TableCaption>A list of sectors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">No</TableHead>
              <TableHead className="text-center">Sector ID</TableHead>
              <TableHead className="text-center">Sector Name</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sectors.length > 0 ? (
              sectors.map((sector, index) => (
                <TableRow key={index}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-center">{sector.sector_id}</TableCell>
                  <TableCell className="text-center">{sector.sector_name}</TableCell>
                  <TableCell className="text-center justify-center flex gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Trash
                          className="text-red-500 cursor-pointer w-5"
                          onClick={() => setDeleteData(sector)}
                        />
                      </AlertDialogTrigger>
                      {deleteData && (
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone. This will permanently delete your data.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(deleteData.sector_id)}>Continue</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      )}
                    </AlertDialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TambahSector onRefresh={fetchSectors} />
      </DialogContent>
    </Dialog>
  );
};

// PropTypes validation
TableSectors.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default TableSectors;
