import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Trash, Download } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import AddUserDialog from "./TambahUser";
import EditUser from "./editUser";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading";
import { useToast } from "@/components/ui/use-toast";

const UserTablePage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUsers();
  });

  const fetchUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("https://api-siexpert.vercel.app/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data);
      setError(null);
    } catch (error) {
      toast({
        description: error.message,
        variant: "destructive",
      });
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`https://api-siexpert.vercel.app/api/users/${deleteUser.sesa}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: "User deleted successfully.",
        variant: "success",
        className: "text-left",
      });
      setUsers(users.filter((user) => user.sesa !== deleteUser.sesa));
      setDeleteUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
        className: "text-left",
      });
    }
  };

  const confirmDelete = (user) => {
    setDeleteUser(user);
  };

  const cancelDelete = () => {
    setDeleteUser(null);
  };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(users);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  if (loading) return <Loading />;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="flex justify-center items-start h-full">
      <div className="p-4 w-full max-w-full">
        <div className="flex justify-between items-center mt-4 ms-4">
          <div className="flex gap-3 items-center">
            <AddUserDialog onRefresh={fetchUsers} />
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
        <div className="m-4">
          <Table className="w-full p-4">
            <TableCaption>A list of users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-left">Sesa</TableHead>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Email</TableHead>
                <TableHead className="text-left">Role</TableHead>
                <TableHead className="text-left">Department</TableHead>
                <TableHead className="text-left">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <TableRow key={user.sesa}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-left">{user.sesa}</TableCell>
                    <TableCell className="text-left">{user.name}</TableCell>
                    <TableCell className="text-left">{user.email}</TableCell>
                    <TableCell className="text-left">{user.role}</TableCell>
                    <TableCell className="text-left">{user.department.join(", ")}</TableCell>
                    <TableCell className="text-left flex gap-2">
                      <EditUser
                        sesa={user.sesa}
                        onRefresh={fetchUsers}
                      />
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Trash
                            className="text-red-500 cursor-pointer w-5"
                            onClick={() => confirmDelete(user)}
                          />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone. This will permanently delete the user.</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
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

export default UserTablePage;
