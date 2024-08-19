import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
interface SubmitButtonProps {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
}
const SubmitButton = ({
  isLoading,
  className,
  children,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      className={cn(
        "shadcn-primary-btn w-full bg-green-500 hover:bg-green-500/75",
        className
      )}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/assets/icons/loader.svg"
            width={24}
            height={24}
            className="animate-spin"
            alt="loader"
          />
          Loading ...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitButton;
