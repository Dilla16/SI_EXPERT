// import PropTypes from "prop-types";
// import { Button } from "@/components/ui/button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { toast } from "@/components/ui/use-toast";
// import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
// import { ListCollapse, Trash } from "lucide-react";
// import axios from "axios";
// import { useState, useEffect } from "react";
// import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
// import TambahFamilies from "./tambahFamilies";
// import EditFamily from "./editFamilies";

// const TableFamilies = () => {
//   const [families, setFamilies] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [error, setError] = useState(null);
//   const [deleteData, setDeleteData] = useState(null);

//   const fetchFamilies = async () => {
//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.get("https://api-siexpert.vercel.app/api/families", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setFamilies(response.data);
//       setError(null);
//     } catch (error) {
//       setError(error);
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchFamilies();
//   }, []);

//   const handleDelete = async (family_id) => {
//     const token = localStorage.getItem("token");

//     try {
//       await axios.delete(`https://api-siexpert.vercel.app/api/families/${family_id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       toast({
//         title: "Success",
//         description: "Family has been successfully deleted.",
//         variant: "success",
//         className: "text-left",
//       });
//       fetchFamilies();
//     } catch (error) {
//       toast({
//         title: "Error",
//         description: "Failed to delete family.",
//         variant: "destructive",
//         className: "text-left",
//       });
//       console.error("Error deleting family:", error);
//     } finally {
//       setDeleteData(null);
//     }
//   };

//   const handleCancelDelete = () => {
//     setDeleteData(null);
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   const filteredFamilies = families.filter(
//     (family) => family.family_id.toLowerCase().includes(searchTerm.toLowerCase()) || family.family_name.toLowerCase().includes(searchTerm.toLowerCase()) || family.sector_id.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (error) return <div>Error fetching data: {error.message}</div>;

//   return (
//     <Dialog>
//       <DialogTrigger>
//         <div>
//           <Button
//             className="flex gap-1 h-8 me-4"
//             variant="outline"
//           >
//             <ListCollapse className="w-4" />
//             <div className="text-xs">Data Family</div>
//           </Button>
//         </div>
//       </DialogTrigger>
//       <DialogContent className="max-w-screen-md max-h-full overflow-auto">
//         <DialogHeader className="my-2">
//           <DialogTitle className="text-center font-bold">DATA FAMILIES</DialogTitle>
//         </DialogHeader>
//         <div className="my-4 flex justify-center">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={searchTerm}
//             onChange={handleSearch}
//             className="border border-gray-300 rounded p-2 w-1/2"
//           />
//         </div>
//         <div className="overflow-y-auto max-h-80">
//           <Table className="w-full mt-4 mb-4">
//             <TableCaption>A list of families.</TableCaption>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="text-center">No</TableHead>
//                 <TableHead className="text-center">Family ID</TableHead>
//                 <TableHead className="text-center">Family Name</TableHead>
//                 <TableHead className="text-center">Sector ID</TableHead>
//                 <TableHead className="text-center">Action</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {filteredFamilies.length > 0 ? (
//                 filteredFamilies.map((family, index) => (
//                   <TableRow key={index}>
//                     <TableCell className="text-center">{index + 1}</TableCell>
//                     <TableCell className="text-center">{family.family_id}</TableCell>
//                     <TableCell className="text-center">{family.family_name}</TableCell>
//                     <TableCell className="text-center">{family.sector_id}</TableCell>
//                     <TableCell className="text-center justify-center flex gap-2">
//                       <EditFamily />
//                       <AlertDialog>
//                         <AlertDialogTrigger>
//                           <Trash
//                             className="text-red-500 cursor-pointer w-5"
//                             onClick={() => setDeleteData(family)}
//                           />
//                         </AlertDialogTrigger>
//                         {deleteData && (
//                           <AlertDialogContent>
//                             <AlertDialogHeader>
//                               <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                               <AlertDialogDescription>This action cannot be undone. This will permanently delete your data.</AlertDialogDescription>
//                             </AlertDialogHeader>
//                             <AlertDialogFooter>
//                               <AlertDialogCancel onClick={handleCancelDelete}>Cancel</AlertDialogCancel>
//                               <AlertDialogAction onClick={() => handleDelete(deleteData.family_id)}>Continue</AlertDialogAction>
//                             </AlertDialogFooter>
//                           </AlertDialogContent>
//                         )}
//                       </AlertDialog>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               ) : (
//                 <TableRow>
//                   <TableCell
//                     colSpan={5}
//                     className="text-center"
//                   >
//                     No data available
//                   </TableCell>
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </div>
//         <TambahFamilies onRefresh={fetchFamilies} />
//       </DialogContent>
//     </Dialog>
//   );
// };

// // PropTypes validation
// TableFamilies.propTypes = {
//   onRefresh: PropTypes.func.isRequired,
// };

// export default TableFamilies;

import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ListCollapse, Pencil, Trash } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import TambahFamilies from "./tambahFamilies";
import EditFamily from "./editFamilies";

const TableFamilies = () => {
  const [families, setFamilies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [editFamilyData, setEditFamilyData] = useState(null); // State to manage family data to be edited

  const fetchFamilies = async () => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.get("https://api-siexpert.vercel.app/api/families", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFamilies(response.data);
      setError(null);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchFamilies();
  }, []);

  const handleDelete = async (family_id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`https://api-siexpert.vercel.app/api/families/${family_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: "Family has been successfully deleted.",
        variant: "success",
        className: "text-left",
      });
      fetchFamilies();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete family.",
        variant: "destructive",
        className: "text-left",
      });
      console.error("Error deleting family:", error);
    } finally {
      setDeleteData(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteData(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFamilies = families.filter(
    (family) => family.family_id.toLowerCase().includes(searchTerm.toLowerCase()) || family.family_name.toLowerCase().includes(searchTerm.toLowerCase()) || family.sector_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Button
            className="flex gap-1 h-8 me-4"
            variant="outline"
          >
            <ListCollapse className="w-4" />
            <div className="text-xs">Data Family</div>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md max-h-full overflow-auto">
        <DialogHeader className="my-2">
          <DialogTitle className="text-center font-bold">DATA FAMILIES</DialogTitle>
        </DialogHeader>
        <div className="my-4 flex justify-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="border border-gray-300 rounded p-2 w-1/2"
          />
        </div>
        <div className="overflow-y-auto max-h-80">
          <Table className="w-full mt-4 mb-4">
            <TableCaption>A list of families.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No</TableHead>
                <TableHead className="text-center">Family ID</TableHead>
                <TableHead className="text-center">Family Name</TableHead>
                <TableHead className="text-center">Sector ID</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFamilies.length > 0 ? (
                filteredFamilies.map((family, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{index + 1}</TableCell>
                    <TableCell className="text-center">{family.family_id}</TableCell>
                    <TableCell className="text-center">{family.family_name}</TableCell>
                    <TableCell className="text-center">{family.sector_id}</TableCell>
                    <TableCell className="text-center justify-center flex gap-2">
                      <Dialog>
                        <DialogTrigger>
                          <Pencil
                            className="cursor-pointer w-5 text-blue-500"
                            onClick={() => setEditFamilyData(family)}
                          />
                        </DialogTrigger>
                        {editFamilyData && (
                          <EditFamily
                            family={editFamilyData}
                            onRefresh={fetchFamilies}
                          />
                        )}
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger>
                          <Trash
                            className="text-red-500 cursor-pointer w-5"
                            onClick={() => setDeleteData(family)}
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
                              <AlertDialogAction onClick={() => handleDelete(deleteData.family_id)}>Continue</AlertDialogAction>
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
                    colSpan={5}
                    className="text-center"
                  >
                    No data available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TambahFamilies onRefresh={fetchFamilies} />
      </DialogContent>
    </Dialog>
  );
};

// PropTypes validation
TableFamilies.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default TableFamilies;
