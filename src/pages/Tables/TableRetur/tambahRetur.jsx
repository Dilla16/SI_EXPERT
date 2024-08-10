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

const useCreateReturn = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const createReturn = async (returnData) => {
    try {
      setLoading(true);
      const response = await axios.post(url, returnData, {
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

  return { createReturn, loading, error };
};

const TambahRetur = ({ onRefresh }) => {
  const { handleSubmit, register, control, reset, watch } = useForm();
  const { createReturn } = useCreateReturn("https://api-siexpert.vercel.app/api/returns");

  const [sectors, setSectors] = useState([]);
  const [families, setFamilies] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFamilyDisabled, setIsFamilyDisabled] = useState(true);
  const [isProductDisabled, setIsProductDisabled] = useState(true);

  const selectedSector = watch("sector");
  const selectedFamily = watch("family_id");

  const token = localStorage.getItem("token");

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
      setIsProductDisabled(true);
    }
  }, [selectedSector]);

  useEffect(() => {
    const fetchProducts = async (family_id) => {
      try {
        const response = await axios.get(`https://api-siexpert.vercel.app/api/products/family/${family_id}`);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (selectedFamily) {
      fetchProducts(selectedFamily);
      setIsProductDisabled(false);
    } else {
      setProducts([]);
      setIsProductDisabled(true);
    }
  }, [selectedFamily]);

  const onSubmit = async (formData) => {
    try {
      const { retur_no, customer_name, country, product_name, qty, serial_no, issue } = formData;
      const returnData = {
        returnData: {
          retur_no,
          customer_name,
          country,
          product_name,
          qty,
          serial_no,
          issue,
        },
      };
      console.log(returnData);
      await createReturn(returnData, token);
      toast({
        title: "Success",
        description: "Return data has been successfully added.",
        variant: "success",
        className: "text-left",
      });
      reset();
      onRefresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add return data.",
        variant: "destructive",
        className: "text-left",
      });
      console.error("Error adding return data:", error);
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
            <div className="text-xs">Add Return</div>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader className="my-2">
          <DialogTitle className="text-center font-bold">ADD NEW RETURN</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="retur_no"
                className="col-span-1"
              >
                Return No.
              </Label>
              <Input
                id="retur_no"
                type="text"
                className="col-span-4"
                {...register("retur_no", { required: true })}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="customer_name"
                className="col-span-1"
              >
                Customer Name
              </Label>
              <Input
                id="customer_name"
                type="text"
                className="col-span-4"
                {...register("customer_name", { required: true })}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="country"
                className="col-span-1"
              >
                Country
              </Label>
              <Input
                id="country"
                type="text"
                className="col-span-4"
                {...register("country", { required: true })}
              />
            </div>
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
                htmlFor="product_name"
                className="col-span-1"
              >
                Product
              </Label>
              <Controller
                name="product_name"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value}
                    id="product_name"
                    className="col-span-4"
                    disabled={isProductDisabled}
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
                )}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="qty"
                className="col-span-1"
              >
                Quantity
              </Label>
              <Input
                id="qty"
                type="number"
                className="col-span-4"
                {...register("qty", { required: true, valueAsNumber: true })}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="serial_no"
                className="col-span-1"
              >
                Serial No.
              </Label>
              <Input
                id="serial_no"
                type="text"
                className="col-span-4"
                {...register("serial_no", { required: true })}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="issue"
                className="col-span-1"
              >
                Issue
              </Label>
              <Input
                id="issue"
                type="text"
                className="col-span-4"
                {...register("issue", { required: true })}
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

TambahRetur.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default TambahRetur;
