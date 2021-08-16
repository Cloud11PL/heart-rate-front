import React from "react";
import { Sidebar, MenuItem, Icon, Menu } from "semantic-ui-react";

const SideBar: React.FC = () => {
  return (
    <Sidebar visible as={Menu} vertical width="thin" icon="labeled">
      <MenuItem as="a" href="/">
        <Icon name="home" />
        Dashboard
      </MenuItem>
      <MenuItem as="a" href="/history">
        <Icon name="book" />
        History
      </MenuItem>
    </Sidebar>
  );
};

export default SideBar;
