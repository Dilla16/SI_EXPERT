import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

const useUpdateProduct = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateProduct = async (product_id, productData) => {
    try {
      setLoading(true);
      const response = await axios.put(`${url}/${product_id}`, productData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { updateProduct, loading, error };
};

const EditProduk = ({ product_id, onRefresh }) => {
  const { handleSubmit, register, control, reset, setValue, watch } = useForm();
  const { updateProduct } = useUpdateProduct("https://api-siexpert.vercel.app/api/products");

  const [sectors, setSectors] = useState([]);
  const [families, setFamilies] = useState([]);
  const [isFamilyDisabled, setIsFamilyDisabled] = useState(true);
  const [created_by, setcreated_by] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const selectedSector = watch("sector");

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const response = await axios.get("https://api-siexpert.vercel.app/api/sectors");
        setSectors(response.data);
      } catch (error) {
        console.error("Error fetching sectors:", error);
      }
    };

    fetchSectors();
  }, []);

  useEffect(() => {
    const fetchFamilies = async (sector_id) => {
      try {
        const response = await axios.get(`https://api-siexpert.vercel.app/api/families/${sector_id}`);
        setFamilies(response.data);
      } catch (error) {
        console.error("Error fetching families:", error);
      }
    };

    if (selectedSector) {
      fetchFamilies(selectedSector);
      setIsFamilyDisabled(false);
    } else {
      setFamilies([]);
      setIsFamilyDisabled(true);
    }
  }, [selectedSector]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get("https://api-siexpert.vercel.app/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setcreated_by(response.data.sesa || "");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api-siexpert.vercel.app/api/products/${product_id}`);
        const product = response.data;

        // Set default values for form fields
        setValue("product_id", product.product_id);
        setValue("product_name", product.product_name);

        // Set family and sector data
        if (product.family) {
          setValue("family_id", product.family.family_id);
          setValue("sector", product.family.sector.sector_id);

          // Fetch the sector if not already available
          if (!sectors.find((sector) => sector.sector_id === product.family.sector.sector_id)) {
            setSectors((prev) => [...prev, product.family.sector]);
          }
        }
        if (product.family) {
          setFamilies((prev) => [...prev, product.family]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    if (isDialogOpen && product_id) {
      fetchProduct();
    }
  }, [isDialogOpen, product_id, setValue, sectors]);

  const onSubmit = async (formData) => {
    try {
      await updateProduct(product_id, { ...formData, created_by: created_by });
      console.log(formData);
      toast({
        title: "Success",
        description: "Product has been successfully updated.",
        variant: "success",
        className: "text-left",
      });
      reset(); // Reset form after submission
      onRefresh(); // Call refresh function
      setIsDialogOpen(false); // Close dialog after submission
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product.",
        variant: "destructive",
        className: "text-left",
      });
      console.error("Error updating product:", error);
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <Pencil
          className="text-blue-500 w-5 cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        />
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader className="my-2">
          <DialogTitle className="text-center font-bold">EDIT PRODUCT</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="sector"
                className="col-span-1"
              >
                Sector
              </Label>
              <Controller
                name="sector"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value}
                    id="sector"
                    className="col-span-4"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem
                          key={sector.sector_id}
                          value={sector.sector_id}
                        >
                          {sector.sector_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="family_id"
                className="col-span-1"
              >
                Family
              </Label>
              <Controller
                name="family_id"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value}
                    id="family_id"
                    className="col-span-4"
                    disabled={isFamilyDisabled}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Family" />
                    </SelectTrigger>
                    <SelectContent>
                      {families.map((family) => (
                        <SelectItem
                          key={family.family_id}
                          value={family.family_id}
                        >
                          {family.family_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="product_id"
                className="col-span-1"
              >
                Product Code
              </Label>
              <Input
                id="product_id"
                type="text"
                name="product_id"
                className="col-span-4"
                {...register("product_id")}
                disabled
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="product_name"
                className="col-span-1"
              >
                Reference
              </Label>
              <Input
                id="product_name"
                type="text"
                name="product_name"
                className="col-span-4"
                {...register("product_name")}
              />
            </div>
          </div>
          <DialogFooter className="justify-center">
            <DialogClose
              asChild
              className="mx-auto w-1/3 mt-4"
            >
              <Button type="submit">Update</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditProduk.propTypes = {
  product_id: PropTypes.number.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default EditProduk;
