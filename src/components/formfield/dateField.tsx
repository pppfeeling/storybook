import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InputMaskField } from "./inputMaskField";
import { ko } from "date-fns/locale";
import { useState } from "react";

type DateFieldProps = { control: any; name: string };

const isValidDate = (dateString: string): boolean => {
  // Date.parse()가 유효한 날짜에 대해 밀리초를 반환하거나, 날짜가 유효하지 않을 경우 NaN을 반환합니다.
  const timestamp = Date.parse(dateString);

  // isNaN 함수를 사용하여 timestamp가 NaN인지 여부를 확인합니다.
  // 유효한 날짜라면 isNaN(timestamp)는 false를, 그렇지 않다면 true를 반환합니다.
  // 따라서, 여기서는 그 결과를 반전시키기 위해 ! 연산자를 사용합니다.
  if (!isNaN(timestamp)) {
    return true;
  } else {
    return false;
  }
};

const DateField = ({ control, name }: DateFieldProps) => {
  const [open, setOpen] = useState(false);

  const calendar_onSelect = (field: any, date: any) => {
    setOpen(false);
    field.onChange(format(date, "yyyy-MM-dd"));
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <Popover open={open} onOpenChange={setOpen}>
            <div className="flex flex-row gap-2 items-center">
              <FormLabel>Date of birth</FormLabel>
              <div className="flex flex-row gap-2 items-center h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                <InputMaskField
                  isExistParent={true}
                  className="w-full h-9 focus-visible:outline-none"
                  mask={"9999-99-99"}
                  maskPlaceholder={"yyyy-mm-dd"}
                  onChange={field.onChange}
                  value={field.value}
                />

                <PopoverTrigger asChild>
                  <CalendarIcon className="ml-auto h-6 w-6 opacity-50" />
                </PopoverTrigger>
              </div>
            </div>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  calendar_onSelect(field, date);
                }}
                locale={ko}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormDescription>
            Your date of birth is used to calculate your age.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

DateField.displayName = "DateField";

export { DateField };
