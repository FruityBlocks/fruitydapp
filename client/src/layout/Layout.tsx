import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useWeb3 } from "../providers/Web3Provider";
import { Navigate, Outlet } from "react-router";

const Layout = () => {
  const [opened, { toggle }] = useDisclosure();
  const { account } = useWeb3();

  if (!account) {
    return <Navigate to={"/connect-wallet"} replace />;
  }

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
      <Navbar toggle={toggle} />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
};

export default Layout;
