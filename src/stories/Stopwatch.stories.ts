import { Stopwatch } from "../Stopwatch/Stopwatch";
import { StoryObj, Meta } from "@storybook/react";
import backgroundTemplate from "../images/unnamed.jpg";
const meta = {
  title: "Example/Stopwatch",
  component: Stopwatch,
} satisfies Meta<typeof Stopwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StopwatchExample: Story = {
  args: { background: backgroundTemplate, size: "medium" },
};
