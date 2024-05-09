import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "../components/ui/button";
import { ChevronRight, Loader2 } from "lucide-react";
import { BreadcrumbLink } from "@/components/ui/breadcrumb";

const meta = {
  title: "ui/Button",
  component: Button,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
    variant: {
      control: "select",
      options: [
        "default",
        "outline",
        "ghost",
        "destructive",
        "secondary",
        "link",
      ],
    },
  },

  parameters: {
    docs: {
      description: {
        component: "shadcn",
      },
    },
  },
  tags: ["autodocs"],

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    variant: "outline",
    size: "sm",
    children: "Button",
  },
};

export const Icon: Story = {
  args: {
    variant: "outline",
    size: "icon",
    children: <ChevronRight className="h-4 w-4" />,
  },
};

export const Link: Story = {
  args: {
    variant: "outline",
    asChild: true,
    children: <BreadcrumbLink href="/components">Components</BreadcrumbLink>,
  },
};

export const ButtonIconLabel: Story = {
  args: {
    variant: "outline",
    disabled: true,
    children: (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </>
    ),
  },
};
