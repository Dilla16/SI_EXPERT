import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { useUser } from "../../../TableUsers/userContext";
import Loading from "@/components/loading";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

const DetailRetur = ({ id, isEditable, setIsEditingDetails }) => {
  const [data, setData] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [sectors, setSectors] = useState([]);
  const [families, setFamilies] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { role: userRole } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        // Fetch return details
        const response = await axios.get(`https://api-siexpert.vercel.app/api/returns/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
        setInitialData(response.data); // Save initial data

        // Fetch lists for sectors, families, and products
        const [sectorsResponse, familiesResponse, productsResponse] = await Promise.all([
          axios.get("https://api-siexpert.vercel.app/api/sectors", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://api-siexpert.vercel.app/api/families", { headers: { Authorization: `Bearer ${token}` } }),
          axios.get("https://api-siexpert.vercel.app/api/products", { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setSectors(sectorsResponse.data);
        setFamilies(familiesResponse.data);
        setProducts(productsResponse.data);

        setError(null);
      } catch (error) {
        setError(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSaveChanges = async () => {
    // Prepare the data to be submitted
    const dataToSubmit = {
      returnData: {
        retur_no: data.retur_no,
        customer_name: data.customer_name,
        country: data.country,
        product_name: data.products?.product_name || "",
        serial_no: data.serial_no,
        issue: data.issue,
      },
    };

    try {
      await axios.put(`https://api-siexpert.vercel.app/api/returns/${id}`, dataToSubmit, {});
      toast({
        title: "Success",
        className: "text-left",
        description: "Changes saved successfully.",
        variant: "success",
      });
      setIsEditingDetails(false);
    } catch (error) {
      console.error("Error saving changes:", error);
      toast({
        title: "Error",
        className: "text-left",
        description: "Failed to save changes.",
        variant: "destructive",
      });
    }
  };

  const handleCancel = () => {
    setData(initialData); // Revert to initial data
    setIsEditingDetails(false); // Exit editing mode
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error fetching data: {error.message}</div>;

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-6">
        {[
          { id: "retur_no", label: "Return Number", value: data.retur_no, type: "text" },
          { id: "customer_name", label: "Customer Name", value: data.customer_name, type: "text" },
          { id: "country", label: "Country", value: data.country, type: "text" },
          {
            id: "sector_id",
            label: "Sector",
            value: data?.products?.families?.sectors?.sector_name || "",
            type: "select",
            component: (
              <Select
                value={data?.products?.families?.sectors?.sector_name || ""}
                disabled={!isEditable}
                onValueChange={(value) =>
                  setData((prev) => ({
                    ...prev,
                    products: {
                      ...prev.products,
                      families: {
                        ...prev.products.families,
                        sectors: {
                          ...prev.products.families.sectors,
                          sector_name: value,
                        },
                      },
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Sector" />
                </SelectTrigger>
                <SelectContent>
                  {sectors.map((sector) => (
                    <SelectItem
                      key={sector.sector_id}
                      value={sector.sector_name}
                    >
                      {sector.sector_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          },
          {
            id: "family_id",
            label: "Family",
            value: data?.products?.families?.family_name || "",
            type: "select",
            component: (
              <Select
                value={data?.products?.families?.family_name || ""}
                disabled={!isEditable}
                onValueChange={(value) =>
                  setData((prev) => ({
                    ...prev,
                    products: {
                      ...prev.products,
                      families: {
                        ...prev.products.families,
                        family_name: value,
                      },
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Family" />
                </SelectTrigger>
                <SelectContent>
                  {families.map((family) => (
                    <SelectItem
                      key={family.family_id}
                      value={family.family_name}
                    >
                      {family.family_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          },
          {
            id: "product_id",
            label: "Product Name",
            value: data?.products?.product_name || "",
            type: "select",
            component: (
              <Select
                value={data?.products?.product_name || ""}
                disabled={!isEditable}
                onValueChange={(value) =>
                  setData((prev) => ({
                    ...prev,
                    products: {
                      ...prev.products,
                      product_name: value,
                    },
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem
                      key={product.product_id}
                      value={product.product_name}
                    >
                      {product.product_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ),
          },
          { id: "qty", label: "Quantity", value: data.qty, type: "text" },
          { id: "serial_no", label: "Serial Number", value: data.serial_no, type: "text" },
          { id: "issue", label: "Issue", value: data.issue, type: "textarea" },
        ].map((field) => (
          <div
            key={field.id}
            className="flex items-center space-x-2"
          >
            <Label
              htmlFor={field.id}
              className="w-1/3 text-left"
            >
              {field.label}
            </Label>
            <div className="w-2/3">
              {field.type === "select" ? (
                field.component
              ) : field.id === "issue" ? (
                <textarea
                  id={field.id}
                  value={data[field.id] || ""}
                  className={`w-full h-24 p-2 cursor-text ${!isEditable ? "border-none focus-visible:ring-0 focus-visible:ring-offset-0" : ""}`}
                  readOnly={!isEditable}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                />
              ) : (
                <Input
                  id={field.id}
                  value={data[field.id] || ""}
                  className={`w-full ${!isEditable ? "border-none focus-visible:ring-0 focus-visible:ring-offset-0" : ""}`}
                  readOnly={!isEditable}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      [field.id]: e.target.value,
                    }))
                  }
                />
              )}
            </div>
          </div>
        ))}
      </div>
      {userRole === "Admin" && (
        <div className="flex justify-center mt-4 gap-4">
          <Button
            onClick={isEditable ? handleSaveChanges : () => setIsEditingDetails(!isEditable)}
            className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white"
          >
            {isEditable ? "Save Changes" : "Edit Details"}
          </Button>
          {isEditable && (
            <Button
              onClick={handleCancel}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white"
            >
              Cancel
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

DetailRetur.propTypes = {
  id: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  setIsEditingDetails: PropTypes.func.isRequired,
};

export default DetailRetur;
