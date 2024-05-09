import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "../components/ui/input";

const meta: Meta<typeof Input> = {
  title: "ui/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component: "shadcn",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Basic: Story = {};

export const WithProp: Story = {
  name: "so 123 Simple",
  render: () => <Input type="email" placeholder="Email" />,
};
