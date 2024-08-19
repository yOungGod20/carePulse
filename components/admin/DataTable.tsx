"use client";
import { Button } from "../ui/button";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  ArrowBottomLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { decryptKey } from "@/lib/utils";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  useEffect(() => {
    const encryptedKey = localStorage.getItem("accessKey");
    if (encryptedKey) {
      const key = decryptKey(encryptedKey);
      if (key != process.env.NEXT_PUBLIC_PASSKEY) {
        router.push("/");
      }
    } else {
      router.push("/");
    }
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="rounded-md border-2 border-dark-500">
      <Table className="w-[1200px] text-zinc-300 ">
        <TableHeader className="bg-green-600 font-bold text-sm text-zinc-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="border-dark-500">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-dark-500 bg-dark-400"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-center space-x-2 py-4 border-t-dark-500 border-t-[2px]  ">
        <Button
          className="grow bg-green-600 text-white border-green-950 text-sm font-semibold hover:bg-green-600/75"
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          <span>Previous</span>
        </Button>
        <Button
          className="grow bg-green-600 text-white border-green-950 text-sm font-semibold  hover:bg-green-600/75"
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span>Next</span>
          <ArrowRightIcon className="w-4 h-4 ml-2 " />
        </Button>
      </div>
    </div>
  );
}
