import { AppShell, Burger, Group } from "@mantine/core";
import Logo from "../components/Logo";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

const Header = ({ opened, toggle }: HeaderProps) => {
  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Logo />
      </Group>
    </AppShell.Header>
  );
};

export default Header;
