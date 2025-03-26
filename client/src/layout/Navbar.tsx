import { AppShell, Stack } from "@mantine/core";
import { NavLink } from "react-router";

interface NavBarProps {
  toggle: () => void;
}

const Navbar = ({ toggle }: NavBarProps) => {
  return (
    <AppShell.Navbar p="md">
      <Stack>
        <NavLink onClick={toggle} to="/">
          Home
        </NavLink>
        <NavLink onClick={toggle} to="/buy">
          MarketPlace
        </NavLink>
        <NavLink onClick={toggle} to="/profile">
          Profile
        </NavLink>
      </Stack>
    </AppShell.Navbar>
  );
};
export default Navbar;
