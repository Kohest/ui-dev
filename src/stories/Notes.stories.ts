import { StoryObj, Meta } from "@storybook/react";
import { Notes } from "../Notes/Notes";
const meta = {
  title: "Example/Notes",
  component: Notes,
} satisfies Meta<typeof Notes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const NotesExample: Story = {
  args: { size: "medium", color: "basic" },
};
