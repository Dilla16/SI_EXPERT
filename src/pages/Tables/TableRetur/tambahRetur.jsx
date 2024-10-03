import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CirclePlus, Trash } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import countriesData from "./country.json";

const useCreateReturn = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createReturn = async (returnData) => {
    const token = localStorage.getItem("token");
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

const TambahRetur = () => {
  const { handleSubmit, register, control, reset, watch } = useForm();
  const { createReturn, loading } = useCreateReturn("https://api-siexpert.vercel.app/api/returns");

  const [serialIssues, setSerialIssues] = useState([{ serial_no: "", issue: "" }]);
  const [sectors, setSectors] = useState([]);
  const [families, setFamilies] = useState([]);
  const [products, setProducts] = useState([]);
  const [isFamilyDisabled, setIsFamilyDisabled] = useState(true);
  const [isProductDisabled, setIsProductDisabled] = useState(true);
  const countries = countriesData;

  const selectedSector = watch("sector");
  const selectedFamily = watch("family_id");

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

  const addSerialIssue = () => setSerialIssues([...serialIssues, { serial_no: "", issue: "" }]);

  const removeSerialIssue = (index) => setSerialIssues(serialIssues.filter((_, i) => i !== index));

  const handleSerialIssueChange = (index, field, value) => {
    setSerialIssues((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const onSubmit = async (formData) => {
    try {
      const { retur_no, customer_name, country, product_name, sector } = formData;
      const returnData = {
        returnData: {
          retur_no,
          customer_name,
          country,
          product_name,
          serial_issues: serialIssues,
          sector,
        },
      };
      console.log(returnData);
      await createReturn(returnData);
      toast({
        title: "Success",
        description: "Return data has been successfully added.",
        variant: "success",
        className: "text-left",
      });
      reset();
      setSerialIssues([{ serial_no: "", issue: "" }]);
      // handleRefresh();
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
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="col-span-1">
              <Label
                htmlFor="retur_no"
                className="mb-2"
              >
                Return No.
              </Label>
              <Input
                id="retur_no"
                type="text"
                {...register("retur_no", { required: true })}
                className="mt-1"
              />
            </div>
            <div className="col-span-1">
              <Label
                htmlFor="customer_name"
                className="mb-2"
              >
                Customer Name
              </Label>
              <Input
                id="customer_name"
                type="text"
                {...register("customer_name", { required: true })}
                className="mt-1"
              />
            </div>
            {/* <div className="col-span-1">
              <Label
                htmlFor="country"
                className="mb-2"
              >
                Country
              </Label>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value}
                    id="country"
                    className="mt-1"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(({ code, name }) => (
                        <SelectItem
                          key={code}
                          value={code}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div> */}
            <div className="col-span-1">
              <Label
                htmlFor="country"
                className="mb-2"
              >
                Country
              </Label>
              <Controller
                name="country"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value}
                    id="country"
                    className="mt-1"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map(({ code, name }) => (
                        <SelectItem
                          key={code}
                          value={code}
                        >
                          {name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="col-span-1">
              <Label
                htmlFor="sector"
                className="mb-2"
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
                    className="mt-1"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map(({ sector_id, sector_name }) => (
                        <SelectItem
                          key={sector_id}
                          value={sector_id}
                        >
                          {sector_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="col-span-1">
              <Label
                htmlFor="family_id"
                className="mb-2"
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
                    disabled={isFamilyDisabled}
                    className="mt-1"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Family" />
                    </SelectTrigger>
                    <SelectContent>
                      {families.map(({ family_id, family_name }) => (
                        <SelectItem
                          key={family_id}
                          value={family_id}
                        >
                          {family_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="col-span-1">
              <Label
                htmlFor="product_name"
                className="mb-2"
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
                    disabled={isProductDisabled}
                    className="mt-1"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map(({ product_name }) => (
                        <SelectItem
                          key={product_name}
                          value={product_name}
                        >
                          {product_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>
          <div className="py-4">
            <Label className="block mb-2">Serial Numbers and Issues</Label>
            {serialIssues.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 mb-2 items-center"
              >
                <Input
                  placeholder="Serial Number"
                  value={item.serial_no}
                  onChange={(e) => handleSerialIssueChange(index, "serial_no", e.target.value)}
                  className="mt-1"
                />
                <Input
                  placeholder="Issue"
                  value={item.issue}
                  onChange={(e) => handleSerialIssueChange(index, "issue", e.target.value)}
                  className="mt-1"
                />
                <Button
                  type="button"
                  onClick={() => removeSerialIssue(index)}
                  variant="outline"
                >
                  <Trash className="w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={addSerialIssue}
              variant="outline"
              className="flex items-center gap-2 mt-2"
            >
              <CirclePlus className="w-4" />
              Add More
            </Button>
          </div>

          <DialogFooter>
            <DialogClose className="mx-auto w-1/3 mt-4">
              <Button
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>

              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

TambahRetur.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
};

export default TambahRetur;
