import { MantineProvider } from "@mantine/core";
import { theme } from "./theme/theme";
import { Web3Provider } from "./providers/Web3Provider";
import AppRoutes from "./routes/Routes";
import { Notifications } from "@mantine/notifications";


function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Notifications
        position="top-right"
        zIndex={2000}
        containerWidth={320}
        portalProps={{ target: document.body }}
      />
      <Web3Provider>
        <AppRoutes />
      </Web3Provider>
    </MantineProvider>
  );
}

export default App;
