import { StoryObj, Meta } from "@storybook/react";

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@radix-ui/react-collapsible";

/**
 * <a href="https://www.radix-ui.com/primitives/docs/components/collapsible" target="_blank">collapsible</a>
 */
const meta: Meta<typeof Collapsible> = {
  title: "ui/Collapsible",
  component: Collapsible,
  argTypes: {
    defaultOpen: {
      control: "boolean",
    },
    open: {
      control: "boolean",
    },
    onOpenChange: {
      control: "object",
    },
    disabled: { control: "boolean" },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Collapsible>;

export const Example: Story = {
  render: (args) => {
    return (
      <Collapsible>
        <CollapsibleTrigger>Collapisible</CollapsibleTrigger>
        <CollapsibleContent>
          Yes. Free to use for personal and commercial projects. No attribution
          required.
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
