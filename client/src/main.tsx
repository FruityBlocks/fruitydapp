import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/notifications";
import { BrowserRouter } from "react-router";
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
