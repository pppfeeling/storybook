import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../components/ui/badge";

const meta = {
  title: "ui/Badge",
  component: Badge,

  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive"],
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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "20",
  },
};

export const Secondary: Story = {
  args: {
    ...Default.args,
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    ...Default.args,
    variant: "outline",
  },
};

export const Destructive: Story = {
  args: {
    ...Default.args,
    variant: "destructive",
  },
};
