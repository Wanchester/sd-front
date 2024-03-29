import styled from "styled-components";

export const NavS = styled.p`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 5rem;
  background-color: black;
`;
export const Sidebar = styled.p<{ sidebar: boolean }>`
  width: 250px;
  height: 100vh;
  background-color: black;
  position: fixed;
  top: 10;
  left: ${({ sidebar }) => (sidebar ? "0" : "-100%")};
`;
export const NavsIcon = styled.p`
  font-size: 2rem;
  margin-left: 3rem;
`;
export const SideWrap = styled.p`
  font-size: 2rem;
  margin-left: 2rem;
  border-radius: 50%;
`;

export const NavsIcon2 = styled.p`
  font-size: 2rem;
  margin-left: 1rem;
  margin-top: 4rem;
`;

export const Sli12 = styled.p`
  margin-left: 0rem;
  margin-top: 2rem;
  background: var(--#11111b);
  padding: 5px;
  text-align: center;
  width: 150px;
  height: 150px;
  border-radius: 80%;
`;
