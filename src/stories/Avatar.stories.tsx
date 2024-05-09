import { StoryObj, Meta } from "@storybook/react";
import { Avatar, AvatarImage, AvatarFallback } from "../components/ui/avatar";

const meta: Meta<typeof Avatar> = {
  title: "ui/Avatar",
  component: Avatar,
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

type Story = StoryObj<typeof Avatar>;

export const Example: Story = {
  args: {},

  render: () => {
    return (
      <>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </>
    );
  },
};
