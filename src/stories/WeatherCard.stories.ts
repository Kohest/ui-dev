import { WeatherCard } from "../WeatherCard/WeatherCard";
import { StoryObj, Meta } from "@storybook/react";
const meta = {
  title: "Example/WeatherCard",
  component: WeatherCard,
} satisfies Meta<typeof WeatherCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WeatherCardExample: Story = {
  args: { color: "basic" },
};
