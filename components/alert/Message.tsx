import React from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
interface MessageProps {
  message: string;
  classname?: string;
  title: string;
}
const Message = ({ message, title, classname }: MessageProps) => {
  return (
    <Alert variant="destructive" className={`${classname}`}>
      <ExclamationTriangleIcon className="h-4 w-4 " />
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default Message;
