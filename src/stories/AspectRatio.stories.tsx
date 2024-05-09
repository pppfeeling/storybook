import { StoryObj, Meta } from "@storybook/react";
import { AspectRatio } from "../components/ui/aspect-ratio";
import examImg from "../assets/image.png";

const meta: Meta<typeof AspectRatio> = {
  title: "ui/AspectRatio",
  component: AspectRatio,
  parameters: {
    docs: {
      description: {
        component:
          "<a href='https://www.radix-ui.com/docs/primitives/components/aspect-ratio' target='_blank'>radix-ui</a>",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AspectRatio>;

export const Example: Story = {
  args: {},

  render: () => {
    return (
      <div className="w-[400px]">
        <AspectRatio ratio={16 / 8} className="bg-muted">
          <img
            src={examImg}
            alt="Image"
            className="rounded-md w-full h-full object-cover"
          />
        </AspectRatio>
      </div>
    );
  },
};
