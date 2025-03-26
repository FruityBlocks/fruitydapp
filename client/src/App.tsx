import { MantineProvider } from "@mantine/core";
import { theme } from "./theme/theme";
import Layout from "./layout/Layout";
import { Web3Provider } from "./providers/Web3Provider";

function App() {
  return (
    <Web3Provider>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <Layout />
      </MantineProvider>
    </Web3Provider>
  );
}

export default App;
