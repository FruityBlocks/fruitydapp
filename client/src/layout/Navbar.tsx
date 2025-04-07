import { AppShell, Stack, NavLink, Text } from "@mantine/core";
import { Link, useLocation } from "react-router";
import {
  IconBuildingStore,
  IconCurrencyEthereum,
  IconHome2,
  IconUser,
} from "@tabler/icons-react";
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
          label={<Text size="xl">Home</Text>}
          leftSection={<IconHome2 size={22} stroke={1.5} />}
          active={activeLink === "/"}
          style={{ borderRadius: "12px", padding: "8px 16px" }}
        />
        <NavLink
          leftSection={<IconBuildingStore size={22} stroke={1.5} />}
          onClick={toggle}
          component={Link}
          to="/buy"
          label={<Text size="xl">MarketPlace</Text>}
          active={activeLink === "/buy"}
          style={{ borderRadius: "12px", padding: "8px 16px" }}
        />
        <NavLink
          leftSection={<IconCurrencyEthereum size={22} stroke={1.5} />}
          onClick={toggle}
          component={Link}
          to="/create"
          label={<Text size="xl">Create Fruit</Text>}
          active={activeLink === "/create"}
          style={{ borderRadius: "12px", padding: "8px 16px" }}
        />
        <NavLink
          leftSection={<IconUser size={22} stroke={1.5} />}
          onClick={toggle}
          component={Link}
          to="/profile"
          label={<Text size="xl">Profile</Text>}
          active={activeLink === "/profile"}
          style={{ borderRadius: "12px", padding: "8px 16px" }}
        />
      </Stack>
    </AppShell.Navbar>
  );
};
export default Navbar;
