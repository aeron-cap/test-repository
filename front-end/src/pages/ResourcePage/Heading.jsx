import { Button, HStack, Heading, Spacer } from "@chakra-ui/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <HStack paddingTop={10}>
      <Heading textAlign="center">Resources</Heading>
      <Spacer />
      <Button as={Link} to="/resources/add" colorScheme="green">
        Add Resource
      </Button>
    </HStack>
  );
};
Header.propTypes = {
  isAdding: PropTypes.bool,
  toggle: PropTypes.func,
};

export default Header;
