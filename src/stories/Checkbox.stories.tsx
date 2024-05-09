import { StoryObj, Meta } from "@storybook/react";
import { useArgs } from "@storybook/preview-api";
import { Checkbox } from "../components/ui/checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckedState } from "@radix-ui/react-checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "ui/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          "<a href='https://www.radix-ui.com/docs/primitives/components/checkbox' target='_blank'>radix-ui</a>",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Example: Story = {
  args: {
    checked: true,
  },

  render: (args) => {
    const [{ isChecked }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ isChecked: !isChecked });
    }

    return (
      <Checkbox checked={args.checked} onCheckedChange={onChange} {...args} />
    );
  },
};

export const Indeterminate: Story = {
  args: {
    checked: true,
  },

  render: (args) => {
    const [checked, setChecked] = useState<CheckedState | undefined>(
      "indeterminate"
    );

    return (
      <>
        <Checkbox checked={checked} onCheckedChange={setChecked} />
        <Button
          onClick={() =>
            setChecked((prevIsChecked) =>
              prevIsChecked === "indeterminate" ? false : "indeterminate"
            )
          }
        >
          Toogle indeterminate
        </Button>
      </>
    );
  },
};
