import { ChakraProvider, Stack, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import theme from "./theme";
import NavigationItem from "./components/Nav-Highlight";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Grid
        w="full"
        templateAreas={{
          base: `"sidenav" "content"`,
          md: `'sidenav contents'`,
        }}
        gridTemplateColumns={[`1fr`, `1fr`, `"20px 1fr"`]}
      >
        <GridItem area="sidenav">
          <Stack>
            <NavigationItem to="/"> Home </NavigationItem>
            <NavigationItem to="/resources"> Resources </NavigationItem>
            <NavigationItem to="/projects"> Projects </NavigationItem>
            <NavigationItem to="/companies"> Companies </NavigationItem>
            <NavigationItem to="/requests"> Requests </NavigationItem>
          </Stack>
        </GridItem>
        <GridItem area="content">
          <Outlet />
        </GridItem>
      </Grid>
    </ChakraProvider>
  );
}
export default App;
