import { StoryObj, type Meta } from "@storybook/react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";

const meta: Meta<typeof Breadcrumb> = {
  title: "ui/Breadcrumb",
  component: Breadcrumb,
  argTypes: {
    className: {
      name: "className",
      type: { name: "string", required: false },
      defaultValue: "text-lg",
      description: "class description",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "text-lg" },
      },
      control: "text",
    },
    children: {
      name: "children",
      type: { name: "string", required: true },
      defaultValue: "",
      description: "하위항목 셋팅",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
      control: "text",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `shadcn<br />root가 아닌 BreadcrumbList에 font size, color에 대한 정의가 들어있다
          `,
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <BreadcrumbList className="text-lg text-slate-500">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "BreadcrumbList에 font size, color에 대한 정의가 들어있다",
      },
    },
  },
};

export const textSm: Story = {
  args: {
    children: (
      <BreadcrumbList className="text-sm text-red-400">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "BreadcrumbList에 font size, color에 대한 정의가 들어있다",
      },
    },
  },
};
