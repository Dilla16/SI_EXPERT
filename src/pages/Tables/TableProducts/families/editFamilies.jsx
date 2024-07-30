import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const useUpdateFamily = (url) => {
  const [error, setError] = useState(null);

  const updateFamily = async (familyData) => {
    try {
      const response = await axios.put(url, familyData);
      return response.data;
    } catch (err) {
      setError(err.response?.data || err.message);
      throw err;
    }
  };

  return { updateFamily, error };
};

const EditFamily = ({ family, onRefresh }) => {
  const { handleSubmit, register, reset, setValue } = useForm({
    defaultValues: {
      family_name: family?.family_name || "",
      sector_id: family?.sector_id || "",
    },
  });
  const { updateFamily, error: updateError } = useUpdateFamily(`https://api-siexpert.vercel.app/api/families/${family.family_id}`);
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
        setError(err.response?.data || err.message);
        console.error("Error fetching sectors:", err);
      }
    };

    fetchSectors();
  }, []);

  useEffect(() => {
    if (family) {
      setValue("family_name", family.family_name);
      setValue("sector_id", family.sector_id);
    }
  }, [family, setValue]);

  const onSubmit = async (formData) => {
    try {
      await updateFamily(formData);
      toast({
        title: "Success",
        description: "Family has been successfully updated.",
        variant: "success",
        className: "text-left",
      });
      reset();
      onRefresh(); // Ensure onRefresh updates necessary state
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update family.",
        variant: "destructive",
        className: "text-left",
      });
      console.error("Error updating family:", error);
    }
  };

  if (error || updateError) {
    return <div>Error: {error?.message || updateError?.message}</div>;
  }

  return (
    <DialogContent className="space-y-6">
      <DialogHeader>
        <DialogTitle className="text-center">Edit Family</DialogTitle>
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
          <Select
            onValueChange={(value) => setValue("sector_id", value)}
            defaultValue={family?.sector_id}
          >
            <SelectTrigger className="h-8">
              <SelectValue placeholder="Select a sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sectors</SelectLabel>
                {sectors.map((sector) => (
                  <SelectItem
                    key={sector.sector_id}
                    value={sector.sector_id}
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
  );
};

// PropTypes validation
EditFamily.propTypes = {
  family: PropTypes.shape({
    family_id: PropTypes.string.isRequired,
    family_name: PropTypes.string.isRequired,
    sector_id: PropTypes.string.isRequired,
  }).isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default EditFamily;
