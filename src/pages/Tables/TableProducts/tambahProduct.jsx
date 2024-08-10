import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CirclePlus } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";

const useCreateProduct = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createProduct = async (productData) => {
    const token = localStorage.getItem("token");

    try {
      setLoading(true);
      const response = await axios.post(url, productData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { createProduct, loading, error };
};

const TambahProduk = ({ onRefresh }) => {
  const { handleSubmit, register, control, reset, watch } = useForm();
  const { createProduct } = useCreateProduct("https://api-siexpert.vercel.app/api/products");

  const [sectors, setSectors] = useState([]);
  const [families, setFamilies] = useState([]);
  const [isFamilyDisabled, setIsFamilyDisabled] = useState(true);

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

  const onSubmit = async (formData) => {
    try {
      const { ...productData } = formData;
      await createProduct(productData);
      toast({
        title: "Success",
        description: "Product has been successfully added.",
        variant: "success",
        className: "text-left",
      });
      reset();
      onRefresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Data Product must fill out!",
        variant: "destructive",
        className: "text-left",
      });
      console.error("Error adding product:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Button
            className="flex gap-1"
            variant="outline"
          >
            <CirclePlus className="w-4" />
            <div className="text-xs">Add Product</div>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader className="my-2">
          <DialogTitle className="text-center font-bold">ADD NEW PRODUCT</DialogTitle>
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
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

TambahProduk.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default TambahProduk;
