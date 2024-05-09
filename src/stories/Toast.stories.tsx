import type { Meta, StoryObj } from "@storybook/react";
import { Toaster } from "@/components/ui/toaster";
import { Button } from "@/components/ui/button";
import {
  Toast,
  ToastAction,
  ToastProvider,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

/**
 * <a href='https://www.radix-ui.com/primitives/docs/components/dialog' target='_blank'>radix-ui</a>
 *  - Toaster 컴포넌트를 app.tsx에 추가
 *  - 사용하고자 하는 컴포넌트에서 useToast() hook를 호출하고 useToast() hook의 toast() 함수를 호출
 */
const meta = {
  title: "ui/Toast",
  component: ToastProvider,

  tags: ["autodocs"],

  argTypes: {},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div>
        <Button
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          Show Toast
        </Button>
        <Toaster />
      </div>
    );
  },
};

export const WithAction: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div>
        <Button
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }}
        >
          Show Toast
        </Button>
        <Toaster />
      </div>
    );
  },
};

export const Destructive: Story = {
  render: () => {
    const { toast } = useToast();

    return (
      <div>
        <Button
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          }}
        >
          Show Toast
        </Button>
        <Toaster />
      </div>
    );
  },
};
