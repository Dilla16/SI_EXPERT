"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Eye, Trash } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import Timeline from "./timeline";
import PropTypes from "prop-types";

const toProperCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getRowClassName = (status) => {
  switch (status.toLowerCase()) {
    case "rejected":
      return "bg-red-100 text-red-700"; // Red background for rejected status
    case "closed":
      return "bg-green-100 text-green-700"; // Green background for closed status
    default:
      return ""; // Default row color
  }
};

const DataTable = ({ data, handleViewClick, userRole, confirmDelete, handleDelete, handleCancelDelete, deleteData, searchTerm }) => {
  const filteredData = data.filter((row) => {
    if (userRole === "Engineer" && row.status.toLowerCase() !== "submitted" && row.status.toLowerCase() !== "rejected" && row.status.toLowerCase() !== "closed") {
      return false;
    }
    return (
      row.returnData.retur_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.returnData.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.returnData.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.returnData.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.returnData.serial_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.returnData.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <Table className="w-full p-4">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[1%] text-left border-b border-gray-400">No</TableHead>
            <TableHead className="w-[10%] text-left border-b border-gray-400">Retur No</TableHead>
            <TableHead className="text-left border-b border-gray-400">Customer Name</TableHead>
            <TableHead className="text-left border-b border-gray-400">Country</TableHead>
            <TableHead className="text-left border-b border-gray-400">Reference</TableHead>
            <TableHead className="text-left border-b border-gray-400">Qty</TableHead>
            <TableHead className="text-left border-b border-gray-400">Serial No.</TableHead>
            <TableHead className="text-left border-b border-gray-400">Issue</TableHead>
            <TableHead className="text-left border-b border-gray-400">Status</TableHead>
            <TableHead className="text-center border-b border-gray-400">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <TableRow
                key={index}
                className={getRowClassName(row.status)}
              >
                <TableCell className="text-left">{index + 1}</TableCell>
                <TableCell className="text-left">{row.returnData.retur_no}</TableCell>
                <TableCell className="text-left">{row.returnData.customer_name}</TableCell>
                <TableCell className="text-left">{row.returnData.country}</TableCell>
                <TableCell className="text-left">{row.returnData.product_name}</TableCell>
                <TableCell className="text-center">{row.returnData.qty}</TableCell>
                <TableCell className="text-left">{row.returnData.serial_no}</TableCell>
                <TableCell className="text-left w-72 overflow-hidden flex-wrap">{row.returnData.issue}</TableCell>
                <TableCell className="text-left">{toProperCase(row.status)}</TableCell>
                <TableCell className="flex text-center gap-2">
                  <div className="flex w-34 text-center gap-2">
                    <Eye
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handleViewClick(row.returnData.analysis.analyze_id, row.returnData.retur_id)}
                    />
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
                    <Timeline retur_id={row.returnData.retur_id} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={10}
                className="text-center"
              >
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
  handleViewClick: PropTypes.func.isRequired,
  userRole: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleCancelDelete: PropTypes.func.isRequired,
  deleteData: PropTypes.object,
  searchTerm: PropTypes.string.isRequired,
};

export default DataTable;
