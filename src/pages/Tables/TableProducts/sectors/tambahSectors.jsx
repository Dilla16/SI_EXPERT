import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";

const useCreateSector = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createSector = async (sectorData) => {
    try {
      setLoading(true);
      const response = await axios.post(url, sectorData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { createSector, loading, error };
};

const TambahSector = ({ onRefresh }) => {
  const { handleSubmit, register, reset } = useForm();
  const { createSector, error } = useCreateSector("https://api-siexpert.vercel.app/api/sectors");

  const onSubmit = async (formData) => {
    try {
      await createSector(formData);
      toast({
        title: "Success",
        description: "Sector has been successfully added.",
        variant: "success",
        className: "text-left",
      });
      reset();
      onRefresh();
    } catch (error) {
      toast({
        title: "Error",
        description: error.response.data.message,
        variant: "destructive",
        className: "text-left",
      });
      console.error("Error adding sector:", error);
    }
  };

  if (error) return <div>Error: {error.message}</div>;

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Button>Add New Sector</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="space-y-6">
        <DialogHeader>
          <DialogTitle className="text-center">Add New Sector</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-3 items-center">
            <Label
              htmlFor="sector_name"
              className="W-[30%]"
            >
              Sector Name
            </Label>
            <Input
              id="sector_name"
              type="text"
              name="sector_name"
              className="w-full h-8"
              {...register("sector_name", { required: true })}
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
TambahSector.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default TambahSector;
