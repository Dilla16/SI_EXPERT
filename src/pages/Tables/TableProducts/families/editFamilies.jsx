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
  const { updateFamily, error: updateError } = useUpdateFamily(`https://api-siexpert.vercel.app/api/families/${family?.family_id}`);
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

  const onSubmit = async (data) => {
    try {
      await updateFamily(data);
      toast({
        title: "Success",
        description: "Family has been successfully updated.",
        variant: "success",
        className: "text-left",
      });
      reset();
      onRefresh();
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update family.",
        variant: "destructive",
        className: "text-left",
      });
      console.error("Error updating family:", err);
    }
  };

  if (error) return <div>Error fetching data: {error}</div>;
  if (updateError) return <div>Error updating data: {updateError}</div>;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center font-bold">Edit Family</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-4 flex flex-col gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="sector_id">Sector ID</Label>
            <Select
              id="sector_id"
              defaultValue={family?.sector_id || ""}
              {...register("sector_id", { required: true })}
            >
              <SelectTrigger>
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
          <div className="flex flex-col space-y-2">
            <Label htmlFor="family_name">Family Name</Label>
            <Input
              id="family_name"
              {...register("family_name", { required: true })}
            />
          </div>
        </div>
        <DialogFooter className="justify-center mt-2">
          <DialogClose
            asChild
            className="mx-auto mt-2"
          >
            <Button type="submit">Save Changes</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

// PropTypes validation
EditFamily.propTypes = {
  family: PropTypes.shape({
    family_id: PropTypes.string,
    family_name: PropTypes.string,
    sector_id: PropTypes.string,
  }),
  onRefresh: PropTypes.func.isRequired,
};

export default EditFamily;
