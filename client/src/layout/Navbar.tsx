import { AppShell, Stack, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { IconCurrencyEthereum, IconHome2, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
interface NavBarProps {
  toggle: () => void;
}

const Navbar = ({ toggle }: NavBarProps) => {
  const [activeLink, setActiveLink] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  return (
    <AppShell.Navbar style={{ zIndex: 1 }} p="md">
      <Stack>
        <NavLink
          onClick={toggle}
          component={Link}
          to="/"
          label="Home"
          leftSection={<IconHome2 size={16} stroke={1.5} />}
          active={activeLink === "/"}
        />
        <NavLink
          leftSection={<IconCurrencyEthereum size={16} stroke={1.5} />}
          onClick={toggle}
          component={Link}
          to="/buy"
          label="MarketPlace"
          active={activeLink === "/buy"}
        />
        <NavLink
          leftSection={<IconUser size={16} stroke={1.5} />}
          onClick={toggle}
          component={Link}
          to="/profile"
          label="Profile"
          active={activeLink === "/profile"}
        />
      </Stack>
    </AppShell.Navbar>
  );
};
export default Navbar;
