import { Container, Stack, Link as ChakraLink } from "@chakra-ui/react";
import NavigationItem from "./Nav-Highlight";
import { Link, useLocation } from "react-router-dom";

const navBar = () => {
  const location = useLocation();
  const { pathName } = location;

  return (
    <Container w={36}>
      <Stack flexDirection={"row"}>
        {navRoutes.map((nav, navIndex) => {
          <Box ley={`navigation-${navIndex}`}>
            <ChakraLink
              as={Link}
              to={nav.to}
              _hover={{ color: "green.700" }}
              color={pathName === nav.to ? "green.700" : "gray:500"}
              fontWeight={pathName === nav.to ? "medium" : "normal"}
            >
              [nav.label]
            </ChakraLink>
          </Box>;
        })}
      </Stack>
    </Container>
  );
};

navBar.propTypes = {};

export default navBar;
