import { StoryObj, Meta } from "@storybook/react";
import { Clock } from "../Clock/Clock";
const meta = {
  title: "Example/Clock",
  component: Clock,
} satisfies Meta<typeof Clock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ClockExample: Story = {
  args: {},
};
