import { MantineProvider } from "@mantine/core";
import { theme } from "./theme/theme";
import { Web3Provider } from "./providers/Web3Provider";
import AppRoutes from "./routes/Routes";

function App() {
  return (
    <Web3Provider>
      <MantineProvider defaultColorScheme="dark" theme={theme}>
        <AppRoutes />
      </MantineProvider>
    </Web3Provider>
  );
}

export default App;
