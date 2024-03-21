import { Button, HStack, Heading, Spacer } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HStack paddingTop={10}>
      <Heading textAlign="center">Requests</Heading>
      <Spacer />
      <Button
        data-test-id="add-requests"
        as={Link}
        to="/requests/add"
        colorScheme="green"
      >
        Add Project
      </Button>
    </HStack>
  );
};
Header.propTypes = {
  isAdding: PropTypes.bool,
  toggle: PropTypes.func,
};

export default Header;
