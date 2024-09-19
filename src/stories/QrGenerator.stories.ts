import { QrGenerator } from "../QrGenerator/QrGenerator";
import { StoryObj, Meta } from "@storybook/react";
const meta = {
  title: "Example/QrGenerator",
  component: QrGenerator,
} satisfies Meta<typeof QrGenerator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const QrGeneratorExample: Story = {
  args: {},
};
