"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
const FILTER_ITEMS = [
  { value: "pending", content: "Pending" },
  { value: "scheduled", content: "Scheduled" },
  { value: "cancelled", content: "Cancelled" },
  { value: "all", content: "All" },
];
const Filter = () => {
  const params = useSearchParams();
  const type = params.get("type") || "all";
  const router = useRouter();
  return (
    <Select
      defaultValue={type}
      onValueChange={(value) => {
        router.push(`/admin?type=${value}`);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {FILTER_ITEMS.map((item) => {
            return (
              <SelectItem key={item.value} value={item.value}>
                {item.content}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Filter;
