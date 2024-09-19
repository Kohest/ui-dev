import { SecondCalculator } from "../SecondCalculator/SecondCalculator";
import { StoryObj, Meta } from "@storybook/react";
const meta = {
  title: "Example/SecondCalculator",
  component: SecondCalculator,
} satisfies Meta<typeof SecondCalculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SecondCalculatorExample: Story = {
  args: {},
};
