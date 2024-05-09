import type { Meta, StoryObj } from "@storybook/react";

import { InputMaskField } from "../components/formfield/inputMaskField";

import { useState } from "react";

const meta: Meta<typeof InputMaskField> = {
  title: "ui/InputMaskField",
  component: InputMaskField,
  parameters: {
    docs: {
      description: {
        component:
          "<a href='https://github.com/sanniassin/react-input-mask' target='_blank'>react input mask</a>",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputMaskField>;

export const DigitPin: Story = {
  args: {
    mask: "9999",
    placeholder: "Enter PIN",
  },
};

export const SimplyDate: Story = {
  args: {
    mask: "9999-99-99",
    placeholder: "YYYY-MM-DD",
    maskChar: null,
  },
};

export const CreditCard: Story = {
  args: {
    mask: "9999 9999 9999 9999",
  },
};

export const CustomProductCode: Story = {
  render: () => {
    const P = /[PK]/;
    const D = /[02468]/;
    const mask = [P, "-", D, D, D, D];

    return <InputMaskField mask={mask} placeholder="Eg: P2266" />;
  },
};

export const TimeInput: Story = {
  render: () => {
    const [mask, setMask] = useState([/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/]);

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      if (value.startsWith("2"))
        setMask([/[0-2]/, /[0-3]/, ":", /[0-5]/, /[0-9]/]); // To block 24, 25, etc.
      else setMask([/[0-2]/, /[0-9]/, ":", /[0-5]/, /[0-9]/]); // To allow 05, 12, etc.
    };

    return <InputMaskField mask={mask} onChange={onChange} />;
  },
};
