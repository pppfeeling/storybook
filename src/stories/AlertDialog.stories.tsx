import { StoryObj, Meta } from "@storybook/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { Button } from "../components/ui/button";
import { useState } from "react";
import { Alerter, useAlert } from "@/components/ui/alerter";

const meta: Meta<typeof AlertDialog> = {
  title: "ui/AlertDialog",
  component: AlertDialog,
  parameters: {
    docs: {
      description: {
        component:
          "<a href='https://www.radix-ui.com/docs/primitives/components/alert-dialog' target='_blank'>radix-ui</a>",
      },
    },
  },

  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof AlertDialog>;

export const Example: Story = {
  args: {
    children: (
      <>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </>
    ),
  },
};

export const AsyncClose: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              wait().then(() => setOpen(false));
            }}
          >
            <Button type="submit">Submit</Button>
          </form>
        </AlertDialogContent>
      </AlertDialog>
    );
  },
};

export const CustomPortal: Story = {
  render: () => {
    const [container, setContainer] = useState<HTMLDivElement | null>(null);

    return (
      <div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline">Show Dialog</Button>
          </AlertDialogTrigger>
          <AlertDialogPortal container={container}>
            <AlertDialogOverlay />
            <AlertDialogContent>
              <Button>Submit</Button>
            </AlertDialogContent>
          </AlertDialogPortal>
        </AlertDialog>
        <div ref={setContainer} />
      </div>
    );
  },
};

export const WithAlerter: Story = {
  render: () => {
    const openAlert = useAlert();

    return (
      <>
        <Button
          variant="outline"
          onClick={() => {
            openAlert({
              title: "Test Promise",
              fnAfterProc: (procState) => {
                console.log(procState);
              },
            });
          }}
        >
          Open
        </Button>
        <Alerter />
      </>
    );
  },
};
