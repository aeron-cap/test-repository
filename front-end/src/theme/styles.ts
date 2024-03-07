import { mode } from "@chakra-ui/theme-tools";

export const styles = {
  global: (props) => ({
    "html, body": {
      bg: mode(`gray.200`, `gray.800`)(props),
      h: "fitcontent-",
      w: "fit-content",
      "div#root": {
        bg: "transparent",
        w: "100%",
        h: "100%",
        minH: "100vh",
        minW: "100vw",
      },
    },
  }),
};

export default styles;
