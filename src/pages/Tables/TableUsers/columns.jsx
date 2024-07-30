// columns.jsx
// import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the column definitions for the DataTable
export const columns = [
  {
    accessorKey: "sesa",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Sesa
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "level",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Level
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => (
      <div className="flex gap-2">
        {/* <Button
          variant="outline"
          onClick={() => console.log(`Edit user ${row.original.sesa}`)}
        >
          Edit
        </Button> */}
        <Pencil className="text-blue-500 cursor-pointer w-5" />
        {/* <Button
          variant="outline"
          onClick={() => console.log(`Delete user ${row.original.sesa}`)}
        >
          <Trash className="text-red-500" />
        </Button> */}
        <Trash
          className="text-red-500 cursor-pointer w-5"
          //   onClick={() => confirmDelete(row)}
        />
      </div>
    ),
  },
];
