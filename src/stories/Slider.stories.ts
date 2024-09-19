import { Slider } from "../Slider/Slider";
import { StoryObj, Meta } from "@storybook/react";
import image1 from "../images/slider/1.jpg";
import image2 from "../images/slider/2.jpg";
import image3 from "../images/slider/3.jpg";
import image4 from "../images/slider/4.jpg";
import image5 from "../images/slider/5.jpg";
import image6 from "../images/slider/6.jpg";


const meta = {
  title: "Example/Slider",
  component: Slider,
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SliderExample: Story = {
  args: {
    images: [image1, image2, image3, image4, image5, image6],
    size: "medium",
  },
};
