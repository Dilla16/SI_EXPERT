import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { useLocation } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import axios from "axios";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetchSectors from "./useFetchSectors"; // Ensure the correct path
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox from Shadcn

const useCreateUser = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createUser = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post(url, userData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { createUser, loading, error };
};

const handleUppercaseInput = (event) => {
  event.target.value = event.target.value.toUpperCase();
};

const TambahDataUser = ({ onRefresh }) => {
  const { handleSubmit, register, control, reset } = useForm();
  const location = useLocation();
  const currentPath = location.pathname;
  const { createUser } = useCreateUser("https://api-siexpert.vercel.app/api/users");
  const { sectors, loading, error } = useFetchSectors();
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  let dialogTitle = "";

  switch (currentPath) {
    case "/data-user":
      dialogTitle = "ADD NEW DATA USER";
      break;
    default:
      return null;
  }

  const handleCheckboxChange = (value) => {
    setSelectedDepartments((prevSelected) => (prevSelected.includes(value) ? prevSelected.filter((v) => v !== value) : [...prevSelected, value]));
  };

  const onSubmit = async (formData) => {
    try {
      const dataToSubmit = { ...formData, department: selectedDepartments };
      console.log("Submitted Data:", dataToSubmit);

      if (!dataToSubmit.sesa || !dataToSubmit.name || !dataToSubmit.email || !dataToSubmit.password || !dataToSubmit.role || !Array.isArray(dataToSubmit.department) || dataToSubmit.department.length === 0) {
        throw new Error("Invalid data: All fields are required and department must be a non-empty array.");
      }

      await createUser(dataToSubmit);
      toast({
        title: "Success",
        description: "Data has been successfully added.",
        variant: "success",
      });
      reset();
      setSelectedDepartments([]);
      onRefresh();
    } catch (error) {
      console.error("Error submitting data:", error); // Log the error details
      toast({
        title: "Error",
        description: `Failed to add data: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Button
            className="flex gap-1 h-8"
            variant="outline"
          >
            <CirclePlus className="w-4" />
            <div className="text-xs">Add Data</div>
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader className="my-2">
          <DialogTitle className="text-center font-bold">{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="sesa"
                className="col-span-1"
              >
                Sesa
              </Label>
              <Input
                id="sesa"
                type="text"
                name="sesa"
                className="col-span-4"
                {...register("sesa")}
                onInput={handleUppercaseInput}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="name"
                className="col-span-1"
              >
                Name
              </Label>
              <Input
                id="name"
                type="text"
                name="name"
                className="col-span-4"
                {...register("name")}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="email"
                className="col-span-1"
              >
                Email
              </Label>
              <Input
                id="email"
                type="text"
                name="email"
                className="col-span-4"
                {...register("email")}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="password"
                className="col-span-1"
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                className="col-span-4"
                {...register("password")}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="role"
                className="col-span-1"
              >
                Role
              </Label>
              <Controller
                name="role"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value } }) => (
                  <Select
                    onValueChange={onChange}
                    value={value}
                    id="role"
                    className="col-span-4"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Superadmin">Superadmin</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                      <SelectItem value="User">User</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="grid grid-cols-5 items-center gap-4">
              <Label
                htmlFor="departments"
                className="col-span-1"
              >
                Departments
              </Label>
              <div className="col-span-4">
                {loading && <p>Loading sectors...</p>}
                {error && <p>Error loading sectors: {error.message}</p>}
                {!loading && !error && (
                  <div className="space-y-4">
                    {sectors.map((sector) => (
                      <div
                        key={sector.sector_id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={sector.sector_id}
                          checked={selectedDepartments.includes(sector.sector_id)}
                          onCheckedChange={() => handleCheckboxChange(sector.sector_id)}
                        />
                        <label
                          htmlFor={sector.sector_id}
                          className="text-sm font-medium leading-none"
                        >
                          {sector.sector_name}
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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

TambahDataUser.propTypes = {
  onRefresh: PropTypes.func.isRequired,
};

export default TambahDataUser;
