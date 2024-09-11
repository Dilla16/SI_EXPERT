import PropTypes from "prop-types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Pencil } from "lucide-react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useFetchSectors from "./useFetchSectors"; // Ensure the correct path
import { Checkbox } from "@/components/ui/checkbox"; // Import Checkbox from Shadcn

const useUpdateUser = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateUser = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.put(url, userData);
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { updateUser, loading, error };
};

const handleUppercaseInput = (event) => {
  event.target.value = event.target.value.toUpperCase();
};

const EditUserForm = ({ sesa }) => {
  const { handleSubmit, register, control, reset, setValue } = useForm();
  const { updateUser } = useUpdateUser(`https://api-siexpert.vercel.app/api/users/${sesa}`);
  const { sectors, loading, error } = useFetchSectors();
  const [selectedDepartments, setSelectedDepartments] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`https://api-siexpert.vercel.app/api/users/${sesa}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;
        setValue("sesa", userData.sesa);
        setValue("name", userData.name);
        setValue("email", userData.email);
        setValue("role", userData.role);
        setSelectedDepartments(userData.department);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [sesa, setValue]);

  const handleCheckboxChange = (value) => {
    setSelectedDepartments((prevSelected) => (prevSelected.includes(value) ? prevSelected.filter((v) => v !== value) : [...prevSelected, value]));
  };

  const onSubmit = async (formData) => {
    try {
      const dataToSubmit = { ...formData, department: selectedDepartments };
      console.log("Submitted Data:", dataToSubmit);

      if (!dataToSubmit.sesa || !dataToSubmit.name || !dataToSubmit.email || !dataToSubmit.role || !Array.isArray(dataToSubmit.department) || dataToSubmit.department.length === 0) {
        throw new Error("Invalid data: All fields are required and department must be a non-empty array.");
      }

      await updateUser(dataToSubmit);
      toast({
        title: "Success",
        className: "text-left",
        description: "Data has been successfully updated.",
        variant: "success",
      });
      reset();
      setSelectedDepartments([]);
    } catch (error) {
      console.error("Error updating data:", error); // Log the error details
      toast({
        title: "Error",
        className: "text-left",
        description: `Failed to update data: ${error.message}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <Pencil className="text-blue-500 w-5" />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader className="my-2">
          <DialogTitle className="text-center font-bold">EDIT USER</DialogTitle>
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
                disabled
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
                      <SelectItem value="Engineer">Engineer</SelectItem>
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
              <Button type="submit">Update</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

EditUserForm.propTypes = {
  sesa: PropTypes.string.isRequired,
  onRefresh: PropTypes.func.isRequired,
};

export default EditUserForm;
