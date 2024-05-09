import type { Meta, StoryObj } from "@storybook/react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "@/components/ui/button";
import { ArrowBigDown, Beer, CircleDotDashed, CloudRain } from "lucide-react";

/**
 * <a href="https://ui.shadcn.com/docs/components/popover" target="_blank">radix-ui</a>
 *
 */
const meta: Meta<typeof Popover> = {
  title: "ui/Popover",
  component: Popover,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-12 h-12 rounded-full text-blue-500 hover:text-blue-900"
          >
            +
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side="top"
          sideOffset={4}
          alignOffset={0}
          align="center"
          className="w-18 bg-transparent border-none shadow-none  "
        >
          <div className="grid grid-cols-1 gap-2 ">
            <div>
              <Button
                variant="outline"
                className="rounded-full w-12 h-12 bg-slate-400"
              >
                <CloudRain className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <Button variant="outline" className="rounded-full w-12 h-12">
                <CircleDotDashed className="w-4 h-4" />
              </Button>
            </div>
            <div>
              <Button variant="outline" className="rounded-full w-12 h-12">
                <Beer className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
