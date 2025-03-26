import { MantineProvider } from "@mantine/core";
import { theme } from "./theme/theme";
import Layout from "./layout/Layout";

function App() {
  return (
    <MantineProvider theme={theme}>
      <Layout />
    </MantineProvider>
  );
}

export default App;
