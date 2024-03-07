import { Button, HStack, Heading, Spacer } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Header = ({ isAdding = false, toggle }) => {
  return (
    <HStack paddingTop={10}>
      <Heading textAlign="center">Projects</Heading>
      <Spacer />
      {!isAdding && (
        <Button colorScheme="green" onClick={toggle}>
          Add Project
        </Button>
      )}
    </HStack>
  );
};
Header.propTypes = { isAdding: PropTypes.bool, toggle: PropTypes.func };

export default Header;
