import { ChakraProvider, Flex, Box, VStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import theme from "./theme";
import NavigationItem from "./components/Nav-Highlight";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Flex>
          <VStack
            minW="10vw"
            fontSize="20px"
            fontWeight="bold"
            spacing="24px"
            bg="white"
            boxShadow="2px 0 4px rgba(0, 0, 0, 0.3)"
            padding="20px"
            paddingTop="50px"
            fontFamily="Roboto, sans-serif"
            alignItems="flex-start"
          >
            <NavigationItem to="/"> Home </NavigationItem>
            <NavigationItem to="/resources"> Resources </NavigationItem>
            <NavigationItem to="/projects"> Projects </NavigationItem>
            <NavigationItem to="/companies"> Companies </NavigationItem>
            <NavigationItem to="/requests"> Requests </NavigationItem>
          </VStack>
          <Outlet />
        </Flex>
      </Box>
    </ChakraProvider>
  );
}
export default App;
