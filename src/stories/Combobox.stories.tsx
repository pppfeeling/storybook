import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ComboboxInput from "../components/ui/comboboxInput";
import { MultiSelect } from "../components/ui/comboboxMulti";
import { Meta, StoryObj } from "@storybook/react";

/**
 * <a href="https://www.embla-carousel.com/guides/" target="_blank">Embla Carousel</a>
 */
const meta: Meta<typeof Popover> = {
  title: "ui/Combobox",
  component: Popover,

  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Popover>;
const frameworks = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
];
export const Example: Story = {
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? frameworks.find((framework) => framework.value === value)?.label
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>

              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  },
};

export const ComboboxInputT: Story = {
  render: (args) => {
    return (
      <>
        <MultiSelect
          label="Salect frameworks"
          placeholder="Select more"
          data={[
            {
              value: "next.js",
              label: "Next.js",
            },
            {
              value: "sveltekit",
              label: "SvelteKit",
            },
            {
              value: "nuxt.js",
              label: "Nuxt.js",
            },
            {
              value: "remix",
              label: "Remix",
            },
            {
              value: "astro",
              label: "Astro",
            },
            {
              value: "wordpress",
              label: "WordPress",
            },
            {
              value: "express.js",
              label: "Express.js",
            },
            {
              value: "nest.js",
              label: "Nest.js",
            },
          ]}
        />
      </>
    );
  },
};

export const Combobox: Story = {
  render: (args) => {
    return (
      <>
        <ComboboxInput />
      </>
    );
  },
};
