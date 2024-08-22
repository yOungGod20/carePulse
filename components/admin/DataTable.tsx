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
import { Suspense, useEffect, useState } from "react";
import {
  ArrowBottomLeftIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { decryptKey } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: any;
  type: "admin" | "user";
}

export function DataTable<TData, TValue>({
  columns,
  data,
  type,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  useEffect(() => {
    const encryptedKey = localStorage.getItem("accessKey");
    if (encryptedKey) {
      const key = decryptKey(encryptedKey);
      if (key != process.env.NEXT_PUBLIC_PASSKEY) {
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }
  });
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  let session;
  if (type === "user") {
    session = useSession();
  }

  return (
    <div className="rounded-md border-2 border-dark-500 w-full  ">
      <Table className=" text-zinc-300 min-h-[360px] ">
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
        <TableBody className="min-h-[360px] ">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-dark-500 bg-dark-400  "
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="align-top py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : type === "user" ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-2xl"
              >
                Do not have any appointments?
                <p className="mt-4">
                  Click &nbsp;
                  <Link
                    className="text-green-400 underline"
                    href={`/patients/${session?.data?.user?.id}/register`}
                  >
                    here
                  </Link>
                  &nbsp;to schedule one
                </p>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                no value
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
