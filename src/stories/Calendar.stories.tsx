import { StoryObj, Meta } from "@storybook/react";
import { Calendar } from "../components/ui/calendar";
import { addDays, addMonths, format, isSameMonth } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ko } from "date-fns/locale";
import { DateRange } from "react-day-picker";

const meta: Meta = {
  title: "ui/Calendar",
  component: Calendar,
  argTypes: {
    mode: {
      control: "select",
      options: ["single", "multiple", "range", "default"],
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          "<a href='https://react-day-picker.js.org/' target='_blank'>react-day-picker</a>",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mode: "single",
  },
  render: (args) => {
    const [selected, setSelected] = useState<Date>();

    let footer = <p>Please pick a day.</p>;
    if (selected) {
      footer = <p>You picked {format(selected, "PP")}.</p>;
    }

    return (
      <Calendar
        selected={selected}
        onSelect={setSelected}
        footer={footer}
        {...args}
      />
    );
  },
};

export const ChangeDefaultMonth: Story = {
  name: "Change the default month",
  render: () => {
    return <Calendar defaultMonth={new Date(1979, 8)} />;
  },
};

export const ControllingCurrentMonth: Story = {
  name: "Controlling the current month",
  render: () => {
    const today = new Date();
    const nextMonth = addMonths(new Date(), 1);
    const [month, setMonth] = useState<Date>(nextMonth);

    const footer = (
      <Button
        disabled={isSameMonth(today, month)}
        onClick={() => setMonth(today)}
      >
        Go to Today
      </Button>
    );
    return <Calendar month={month} onMonthChange={setMonth} footer={footer} />;
  },
};

export const LimitingMonthNavigation: Story = {
  name: "Limiting the month navigation",
  render: () => {
    return (
      <Calendar
        defaultMonth={new Date(2015, 0)}
        fromYear={2015}
        toYear={2018}
      />
    );
  },
};

export const BetweenMonths: Story = {
  name: "Between months or dates",
  render: () => {
    const defaultMonth = new Date(2015, 5);
    return (
      <Calendar
        defaultMonth={defaultMonth}
        fromMonth={defaultMonth}
        toDate={new Date(2015, 10, 20)}
      />
    );
  },
};

const pastMonth = new Date(2020, 10, 15);

export const ChoosingCationLayout: Story = {
  name: "Choosing a caption layout",
  render: () => {
    const defaultSelected: DateRange = {
      from: pastMonth,
      to: addDays(pastMonth, 4),
    };
    const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

    let footer = <p>Please pick the first day.</p>;
    if (range?.from) {
      if (!range.to) {
        footer = <p>{format(range.from, "PPP")}</p>;
      } else if (range.to) {
        footer = (
          <p>
            {format(range.from, "PPP")}–{format(range.to, "PPP")}
          </p>
        );
      }
    }

    return (
      <Calendar
        mode="range"
        locale={ko}
        numberOfMonths={2}
        captionLayout="dropdown"
        defaultMonth={pastMonth}
        selected={range}
        footer={footer}
        onSelect={setRange}
      />
    );
  },
};

export const DisableingNavigation: Story = {
  name: "Disabling navigation",
  render: () => {
    return <Calendar disableNavigation />;
  },
};
