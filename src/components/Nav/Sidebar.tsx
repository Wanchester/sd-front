import React, { useState } from "react";
import { NavS, NavsIcon, Sidebar, SideWrap, NavsIcon2 } from "./Sidebar.Styles";
import { IconContext } from "react-icons";
import { BsFillGrid3X3GapFill, BsArrowDownCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Nav: React.FC = () => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <IconContext.Provider value={{ color: "#fff" }}>
      <NavS>
        <NavsIcon onClick={showSidebar}>
          <BsFillGrid3X3GapFill />
        </NavsIcon>
      </NavS>
      <Sidebar sidebar={sidebar}>
        <SideWrap>
          <NavsIcon2 onClick={showSidebar}>
            <BsArrowDownCircleFill />
          </NavsIcon2>
          <Link to="/">
            <Button>HomePage</Button>
          </Link>
        </SideWrap>
      </Sidebar>
    </IconContext.Provider>
  );
};

export default Nav;
