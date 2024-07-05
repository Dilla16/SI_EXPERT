import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLocation } from "react-router-dom"; // import useLocation from react-router-dom
import { CirclePlus } from "lucide-react";

const AddDataDialog = () => {
  const { handleSubmit, register, control, reset } = useForm();
  const location = useLocation(); // get current location path
  const currentPath = location.pathname; // current path

  let dialogTitle = "";
  let fields = [];

  switch (currentPath) {
    case "/data-user":
      dialogTitle = "ADD NEW DATA USER";
      fields = [
        { label: "Sesa", name: "sesa", type: "text" },
        { label: "Name", name: "name", type: "text" },
        { label: "Email", name: "email", type: "text" },
        { label: "Password", name: "password", type: "password" },
        { label: "Role", name: "role", type: "select", options: ["Admin", "User"] },
        { label: "Level", name: "level", type: "select", options: ["1", "2", "3"] },
      ];
      break;
    case "/data-produk":
      dialogTitle = "ADD NEW DATA PRODUCT";
      fields = [
        { label: "Sector", name: "sector", type: "select", options: ["Electronics", "Furniture", "Clothing"] },
        { label: "Family", name: "family", type: "select", options: ["Family 1", "Family 2", "Family 3"] },
        { label: "Product Code", name: "productCode", type: "text" },
        { label: "Reference", name: "reference", type: "text" },
      ];
      break;
    case "/data-retur":
      dialogTitle = "ADD NEW DATA RETUR";
      fields = [
        { label: "Return No", name: "returNo", type: "text" },
        { label: "Customer Name", name: "customerName", type: "text" },
        { label: "Country", name: "country", type: "text" },
        { label: "Product Code", name: "productCode", type: "text" },
        { label: "Qty", name: "qty", type: "number" },
        { label: "Serial No", name: "serialNo", type: "text" },
      ];
      break;
    default:
      dialogTitle = "Add Data";
      break;
  }

  const onSubmit = (formData) => {
    toast({
      title: "Data Submitted",
      description: JSON.stringify(formData),
    });
    console.log("Submitted data:", formData);
    reset(); // Reset form after submission
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          className="flex gap-1"
          variant="outline"
        >
          <CirclePlus className="w-4" />
          <div className=" text-xs">Add Data</div>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-screen-md">
        <DialogHeader className="my-2">
          <DialogTitle className="text-center font-bold">{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {fields.map((field, index) => (
              <div
                key={index}
                className="grid grid-cols-5 items-center gap-4"
              >
                <Label
                  htmlFor={field.name}
                  className="col-span-1"
                >
                  {field.label}
                </Label>
                {field.type === "select" ? (
                  <Select
                    id={field.name}
                    control={control}
                    name={field.name}
                    defaultValue=""
                    className="col-span-4"
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={`Select ${field.label}`} />
                    </SelectTrigger>
                    <SelectContent>
                      {field.options.map((option, idx) => (
                        <SelectItem
                          key={idx}
                          value={option}
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    name={field.name}
                    className="col-span-4"
                    {...register(field.name)}
                  />
                )}
              </div>
            ))}
          </div>
          <DialogFooter className="justify-center">
            <DialogClose
              asChild
              className=" mx-auto w-1/3 mt-4"
            >
              <Button type="submit">Submit</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDataDialog;
