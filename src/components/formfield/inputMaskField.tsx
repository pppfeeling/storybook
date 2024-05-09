import * as React from "react";

import InputMask, { Props } from "react-input-mask";

import { cn } from "@/lib/utils";

type InputMaskProps = Props & { isExistParent?: boolean };

const InputMaskField = React.forwardRef<HTMLInputElement, InputMaskProps>(
  ({ className, isExistParent = false, ...props }, ref) => {
    const selfClassName = isExistParent
      ? cn("", className)
      : cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        );

    return <InputMask className={selfClassName} inputRef={ref} {...props} />;
  }
);

InputMaskField.displayName = "InputMaskField";

export { InputMaskField };
