import { StoryObj, Meta } from "@storybook/react";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertCircle } from "lucide-react";

const meta: Meta<typeof Alert> = {
  title: "ui/Alert",
  component: Alert,
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive"],
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
};

export default meta;

type Story = StoryObj<typeof Alert>;

export const Example: Story = {
  args: {
    variant: "default",
    children: (
      <>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </>
    ),
  },
};
