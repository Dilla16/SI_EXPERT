import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "../TableUsers/userContext";
import Loading from "@/components/loading";
import TambahRetur from "./tambahRetur";
import ExportToExcel from "./exportButtons";
import DataTable from "./setTableRetur";
import SearchInput from "./searchData";

const DataRetur = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [editingData, setEditingData] = useState(null); // State for editing data
  const [editFormData, setEditFormData] = useState(null); // State for form data

  const token = localStorage.getItem("token");
  const { role: userRole } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
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
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleDelete = async (data) => {
    if (!data) return;

    try {
      await axios.delete(`https://api-siexpert.vercel.app/api/returns/${data.returnData.retur_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast({
        title: "Success",
        description: "Return data has been successfully deleted.",
        variant: "success",
        className: "text-left",
      });
      handleRefresh();
    } catch (error) {
      setError(error);
      toast({
        title: "Error",
        description: "Failed to delete return data.",
        variant: "destructive",
        className: "text-left",
      });
    } finally {
      setDeleteData(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteData(null);
  };

  const confirmDelete = (data) => {
    setDeleteData(data);
  };

  const handleRefresh = async () => {
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

  const handleViewClick = (analyzeId, returnId) => {
    if (analyzeId && returnId) {
      navigate(`/data-retur/detail/${returnId}`);
    } else {
      console.error("Invalid analyzeId or returnId:", analyzeId, returnId);
    }
  };

  const handleEditClick = (data) => {
    setEditingData(data);
    setEditFormData(data.returnData); // Initialize form with current data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!editingData) return;

    try {
      await axios.put(
        `https://api-siexpert.vercel.app/api/returns/${editingData.returnData.retur_id}`,
        {
          ...editFormData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast({
        title: "Success",
        description: "Changes have been successfully saved.",
        variant: "success",
        className: "text-left",
      });
      handleRefresh();
      setEditingData(null); // Clear editing state
    } catch (error) {
      setError(error);
      toast({
        title: "Error",
        description: "Failed to save changes.",
        variant: "destructive",
        className: "text-left",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingData(null);
  };

  if (loading) return <Loading />;
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="flex justify-center items-start h-full">
      <div className="p-4 w-full max-w-full">
        <div className="flex justify-between items-center ms-6 me-4 gap-3">
          <div className="justify-start">
            <SearchInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            {userRole === "Admin" && <TambahRetur />}
            {userRole !== "User" && <ExportToExcel data={data} />}
          </div>
        </div>
        <div className="ms-4 me-4 mb-4 pb-4 overflow-auto">
          <DataTable
            data={data}
            handleViewClick={handleViewClick}
            userRole={userRole}
            confirmDelete={confirmDelete}
            handleDelete={handleDelete}
            handleCancelDelete={handleCancelDelete}
            deleteData={deleteData}
            searchTerm={searchTerm} // Pass search term
            onEditClick={handleEditClick} // Pass the edit click handler
          />
        </div>
        {editingData && (
          <div className="p-4 border border-gray-300 rounded shadow-sm">
            <h3 className="text-lg font-semibold">Edit Return Data</h3>
            <div className="mt-4">
              <label className="block mb-2">Retur No</label>
              <input
                type="text"
                name="retur_no"
                value={editFormData.retur_no || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {/* Add other fields similarly */}
              <label className="block mt-4 mb-2">Customer Name</label>
              <input
                type="text"
                name="customer_name"
                value={editFormData.customer_name || ""}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded w-full"
              />
              {/* Add other fields similarly */}
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataRetur;
