"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel, getFilteredRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import AddUserDialog from "./TambahUser";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const exportToExcel = () => {
    const rows = table.getRowModel().rows.map((row) => {
      const rowData = {};
      row.getVisibleCells().forEach((cell) => {
        rowData[cell.column.columnDef.accessorKey] = cell.getValue();
      });
      return rowData;
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "users.xlsx");
  };

  return (
    <div>
      <div className="flex items-center py-4 gap-3 justify-between">
        <Input
          placeholder="Filter SESA..."
          value={table.getColumn("sesa")?.getFilterValue() || ""}
          onChange={(event) => table.getColumn("sesa")?.setFilterValue(event.target.value)}
          className="max-w-sm text-xs h-8 rounded-md"
        />
        <div className="flex items-center gap-3">
          <AddUserDialog />
          <Button
            className="flex gap-1 h-8"
            variant="outline"
            onClick={exportToExcel}
          >
            <Download className="w-3 text-left hover:text-gray-500 cursor-pointer" />
            <div className="text-xs">Download</div>
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="text-sm">
          <TableHeader className="text-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="text-left">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      accessorKey: PropTypes.string.isRequired,
      header: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["pending", "processing", "success", "failed"]).isRequired,
      email: PropTypes.string.isRequired,
    })
  ).isRequired,
};
