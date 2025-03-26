import { AppShell, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  return (
    <AppShell
      header={{ height: { base: 60, md: 70, lg: 80 } }}
      navbar={{
        width: { base: 200, md: 300, lg: 400 },
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <Header opened={opened} toggle={toggle} />
      <Navbar />
      <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
};

export default Layout;
