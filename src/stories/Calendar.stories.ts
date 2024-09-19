import { StoryObj, Meta } from "@storybook/react";
import { Calendar } from "../Calendar/Calendar";
const meta = {
  title: "Example/Calendar",
  component: Calendar,
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CalendarExample: Story = {
  args: { lang: "rus", color: "#f84936", size: "medium" },
};
