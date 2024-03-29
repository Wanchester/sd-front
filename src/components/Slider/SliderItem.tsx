import React from "react";
import { StyledSliderItem } from "./SliderItemStyles";

type SliderItemProps = {
  slideClass: string;
  zoomFactor: number;
  id: number;
  callback: (id: number) => void;
  callbackOut: () => void;
  slideMargin: number;
  visibleSlides: number;
  children: any; // eslint-disable-line
};

const SliderItem: React.FC<SliderItemProps> = ({
  slideMargin,
  visibleSlides,
  zoomFactor,
  slideClass,
  id,
  callback,
  callbackOut,
  children,
}) => (
  <StyledSliderItem
    zoomFactor={zoomFactor}
    slideMargin={slideMargin}
    visibleSlides={visibleSlides}
    className={slideClass}
    onMouseOver={() => callback(id)}
    onMouseOut={callbackOut}
  >
    {children}
  </StyledSliderItem>
);

export default SliderItem;
