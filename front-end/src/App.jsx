import { ChakraProvider, Flex, Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import theme from "./theme";
import Navbar from "./Navbar"; // Import your Navbar component from the appropriate location

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid
        w="full"
        templateAreas={{
          base: `"sidenav"
                 "content"`,
          md: `"sidenav content"`,
        }}
        gridTemplateColumns={[`1fr`, `1fr`, `200px 1fr`]}
      >
        <GridItem area="sidenav">
          <Navbar />
        </GridItem>
        <GridItem area="content">
          <Outlet />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
export default App;
