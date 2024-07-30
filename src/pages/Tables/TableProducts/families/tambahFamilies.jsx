import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const useCreateFamily = (url) => {
  const [error, setError] = useState(null);

  const createFamily = async (familyData) => {
    try {
      const response = await axios.post(url, familyData);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  return { createFamily, error };
};

const TambahFamilies = ({ onRefresh }) => {
  const { handleSubmit, register, reset, setValue } = useForm();
  const { createFamily, error: createError } = useCreateFamily("https://api-siexpert.vercel.app/api/families");
  const [sectors, setSectors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      } catch (err) {
        setError(err);
        console.error("Error fetching sectors:", err);
      }
    };

    fetchSectors();
  }, []);

  const onSubmit = async (formData) => {
    try {
      await createFamily(formData);
      toast({
        title: "Success",
        description: "Family has been successfully added.",
        variant: "success",
        className: "text-left",
      });
      reset();
      onRefresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add family.",
        variant: "destructive",
        className: "text-left",
      });
      console.error("Error adding family:", error);
    }
  };

  if (error || createError) return <div>Error: {error?.message || createError?.message}</div>;

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Button>Add New Family</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="space-y-6">
        <DialogHeader>
          <DialogTitle className="text-center">Add New Family</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="flex gap-3 items-center">
            <Label
              htmlFor="sector_id"
              className="w-[30%]"
            >
              Sector
            </Label>
            <Select onValueChange={(value) => setValue("sector_id", value)}>
              <SelectTrigger className="h-8">
                <SelectValue placeholder="Select a sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sectors</SelectLabel>
                  {sectors.map((sector) => (
                    <SelectItem
                      key={sector.sector_id}
                      value={sector.sector_name}
                    >
                      {sector.sector_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3 items-center">
            <Label
              htmlFor="family_name"
              className="w-[30%]"
            >
              Family Name
            </Label>
            <Input
              id="family_name"
              type="text"
              name="family_name"
              className="col-span-1 h-8"
              {...register("family_name", { required: true })}
            />
          </div>

          <DialogFooter className="justify-center">
            <DialogClose
              asChild
              className="mx-auto w-1/3 mt-4"
            >
              <Button
                type="submit"
                className="mt-4"
              >
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// PropTypes validation
TambahFamilies.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default TambahFamilies;
