import { AppShell, Stack, NavLink } from "@mantine/core";
import { Link } from "react-router";
import { IconCurrencyEthereum, IconHome2, IconUser } from "@tabler/icons-react";
interface NavBarProps {
  toggle: () => void;
}

const Navbar = ({ toggle }: NavBarProps) => {
  return (
    <AppShell.Navbar style={{ zIndex: 1 }} p="md">
      <Stack>
        <NavLink
          onClick={toggle}
          component={Link}
          to="/"
          label="Home"
          leftSection={<IconHome2 size={16} stroke={1.5} />}
        />
        <NavLink
          leftSection={<IconCurrencyEthereum size={16} stroke={1.5} />}
          onClick={toggle}
          component={Link}
          to="/buy"
          label="MarketPlace"
        />
        <NavLink
          leftSection={<IconUser size={16} stroke={1.5} />}
          onClick={toggle}
          component={Link}
          to="/profile"
          label="Profile"
        />
      </Stack>
    </AppShell.Navbar>
  );
};
export default Navbar;
