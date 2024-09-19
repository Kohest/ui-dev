import { StoryObj, Meta } from "@storybook/react";
import { Calculator } from "../Calculator/Calculator";
const meta = {
  title: "Example/Calculator",
  component: Calculator,
} satisfies Meta<typeof Calculator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CalculatorExample: Story = {
  args: {},
};
