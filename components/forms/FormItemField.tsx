import React from "react";
import { Control } from "react-hook-form";
import { FormFieldType } from "@/schema/zod/loginForm";
import { Checkbox } from "../ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "../ui/form";
import { Input } from "../ui/input";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

interface FormItemProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  disable: boolean;
  iconAlt?: string;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => any;
}

const RenderField = ({
  field,
  props,
}: {
  field: any;
  props: FormItemProps;
}) => {
  const { fieldType, placeholder, iconSrc, iconAlt, disable, children } = props;
  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400 px-2 ">
          {iconSrc && (
            <Image
              src={iconSrc || ""}
              height={24}
              width={24}
              alt={iconAlt || "icon"}
            />
          )}

          <FormControl>
            <Input
              disabled={disable}
              placeholder={placeholder || ""}
              {...field}
              type={fieldType}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            disabled={disable}
            defaultCountry="CN"
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input-phone h-full w-full "
          />
        </FormControl>
      );

    case FormFieldType.DATA_PICKER:
      return (
        <div className="flex rouded-md border border-dark-500 bg-dark-400  pl-2">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
          />
          <FormControl>
            <DatePicker
              disabled={disable}
              className="cursor-pointer "
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              showTimeSelect
              dateFormat={"MM/dd/yyyy hh:mm"}
              wrapperClassName="date-picker"
              timeInputLabel="Time:"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            disabled={disable}
            {...field}
            placeholder={placeholder}
            className="bg-dark-400 border-dark-500 focus-visible:ring-0"
          />
        </FormControl>
      );
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={placeholder}>
            <FormControl>
              <SelectTrigger
                disabled={disable}
                className="shadcn-select-trigger border-dark-600 bg-dark-400 py-6 focus:ring-0"
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent
              position="popper"
              align="end"
              side="bottom"
              className="shadcn-select-content bg-dark-400  border-dark-600 "
            >
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.SKELETON:
      if (props.renderSkeleton) return props.renderSkeleton(field);
    case FormFieldType.CHECK_BOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              name={props.name}
              id={props.name}
              onCheckedChange={field.onChange}
              checked={field.value}
              className="bg-gradient-to-br from-green-500 to-green-600"
            />
            <label
              htmlFor={props.name}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ",
                field.value == true ? "text-green-200" : ""
              )}
            >
              {placeholder}
            </label>
          </div>
        </FormControl>
      );

    default:
      return "";
  }
};

const FormItemField = (props: FormItemProps) => {
  const { control, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="grow w-max-[50%]">
          <FormLabel>{label}</FormLabel>
          <RenderField field={field} props={props} />
          <FormDescription></FormDescription>
          <FormMessage className="text-red-700" />
        </FormItem>
      )}
    />
  );
};

export default FormItemField;
