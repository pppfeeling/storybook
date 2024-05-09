import { StoryObj, Meta } from "@storybook/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

/**
 * <a href='https://www.radix-ui.com/docs/primitives/components/accordion' target='_blank'>radix-ui</a>
 */
const meta: Meta<typeof Accordion> = {
  title: "ui/Accordion",
  component: Accordion,
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
      description: "아이템 패널을 싱글로 열지 멀티로 열 수 있을지 결정",
    },
    collapsible: {
      control: "boolean",
      description: "아이템 패널을 모두 확장 할지 / 모두 축소할지  여부",
    },
    disabled: {
      control: "boolean",
      description: "아이템 패널을 확장/축소 불가",
    },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },

  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const Example: Story = {
  args: {},

  render: (args) => {
    return (
      <Accordion {...args} className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  },
};

export const defaultValue: Story = {
  args: {
    defaultValue: "item-2",
    type: "single",
    disabled: false,
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </>
    ),
  },
};

export const Orientation: Story = {
  args: {
    orientation: "vertical",
    type: "single",
    children: (
      <>
        <AccordionItem value="item-1">
          <AccordionTrigger>Is it accessible?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it styled?</AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Is it animated?</AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </>
    ),
  },
};
