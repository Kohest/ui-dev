import type { Meta, StoryObj } from "@storybook/react";
import { MusicPlayer } from "../MusicPlayer/MusicPlayer";
const meta = {
  title: "Example/MusicPlayer",
  component: MusicPlayer,
} satisfies Meta<typeof MusicPlayer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MusicPlayerExample: Story = {
  args: {
    title: "Title",
    author: "Author",
    song: "",
    coverImage: "",
  },
};
