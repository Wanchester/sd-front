import React, { useEffect, useRef } from "react";
import { Image, Wrapper } from "./TeamAvatar.styles";
const TeamAvatar = ({ imageLink }: { imageLink: string }) => {
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (null !== avatarRef.current) {
      avatarRef.current.style.height = getComputedStyle(
        avatarRef.current
      ).width;
    }
    window.addEventListener("resize", () => {
      if (null !== avatarRef.current) {
        avatarRef.current.style.height = getComputedStyle(
          avatarRef.current
        ).width;
      }
    });
  });
  return (
    <Wrapper ref={avatarRef}>
      <Image src={imageLink}></Image>
    </Wrapper>
  );
};

export default TeamAvatar;
