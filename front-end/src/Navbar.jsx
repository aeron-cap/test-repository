import { Link, Stack, Container, Center } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <Container nb={4}>
      <Center>
        <Stack flexDirection={{ base: "row", md: "column" }}>
          <Link as={NavLink} to="/" mb={4}>
            Home
          </Link>
          <Link as={NavLink} to="/resources" mb={4}>
            Resources
          </Link>
          <Link as={NavLink} to="/projects" mb={4}>
            Projects
          </Link>
          <Link as={NavLink} to="/companies" mb={4}>
            Companies
          </Link>
          <Link as={NavLink} to="/requests">
            Requests
          </Link>
        </Stack>
      </Center>
    </Container>
  );
}

export default Navbar;
