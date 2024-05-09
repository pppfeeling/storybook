import { StoryObj, Meta } from "@storybook/react";

import { Control, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "../components/ui/button";
import { Form } from "../components/ui/form";
import { DateField } from "../components/formfield/dateField";

const meta: Meta<typeof DateField> = {
  title: "ui/DateField",
  component: DateField,
  parameters: {
    docs: {
      description: {
        component:
          "<a href='https://react-day-picker.js.org/' target='_blank'>react-day-picker</a> && react-masked-input",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof DateField>;

const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export const Example: Story = {
  args: {},

  render: (args) => {
    const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <DateField name="dob" control={form.control as any} />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};
