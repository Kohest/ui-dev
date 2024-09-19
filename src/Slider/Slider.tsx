import React, { useRef, useEffect } from "react";
import "./Slider.css";
import backward from "../images/slider/back.png";
import forward from "../images/slider/next.png";
enum Size {
  small = 300,
  medium = 600,
  large = 900,
}

interface Props {
  images: string[];
  size?: keyof typeof Size;
}

export const Slider: React.FC<Props> = ({ images, size = "large" }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const backBtnRef = useRef<HTMLImageElement>(null);
  const nextBtnRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const scrollContainer = galleryRef.current;
    const nextBtn = nextBtnRef.current;
    const backBtn = backBtnRef.current;
    const scrollAmount = Size[size];

    if (scrollContainer && nextBtn && backBtn) {
      const handleScroll = (event: WheelEvent) => {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
        scrollContainer.style.scrollBehavior = "auto";
      };

      const handleNextClick = () => {
        scrollContainer.style.scrollBehavior = "smooth";
        scrollContainer.scrollLeft += scrollAmount;
      };

      const handleBackClick = () => {
        scrollContainer.style.scrollBehavior = "smooth";
        scrollContainer.scrollLeft -= scrollAmount;
      };

      scrollContainer.addEventListener("wheel", handleScroll);
      nextBtn.addEventListener("click", handleNextClick);
      backBtn.addEventListener("click", handleBackClick);

      return () => {
        scrollContainer.removeEventListener("wheel", handleScroll);
        nextBtn.removeEventListener("click", handleNextClick);
        backBtn.removeEventListener("click", handleBackClick);
      };
    }
  }, [size]);

  return (
    <div className="gallery_wrap">
      <img src={backward} alt="backward" ref={backBtnRef} id="backBtn" />
      <div
        className="gallery"
        ref={galleryRef}
        style={{ width: `${Size[size || "large"]}px` }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery_item"
            style={{
              backgroundImage: `url(${image})`,
              width: "280px",
              height: "330px",
            }}
          />
        ))}
      </div>
      <img src={forward} alt="forward" ref={nextBtnRef} id="nextBtn" />
    </div>
  );
};
