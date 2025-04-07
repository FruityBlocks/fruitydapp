import { notifications } from "@mantine/notifications";

export const handleError = (title: string, message: string, color: string) => {
  notifications.show({
    title: title,
    message: message,
    color: color,
    position: "top-right",
    autoClose: 5000,
    withCloseButton: true,
    style: {
      position: "fixed",
      top: "3rem",
      right: "3rem",
      opacity: 1,
      transform: "none",
      marginTop: "3rem",
    },
  });
};
