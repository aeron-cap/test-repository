import { HStack, Heading, Spacer } from "@chakra-ui/react";
import PropTypes from "prop-types";

const Header = () => {
  return (
    <HStack paddingTop={10}>
      <Heading textAlign="center">Resources</Heading>
      <Spacer />
    </HStack>
  );
};
Header.propTypes = { isAdding: PropTypes.bool, toggle: PropTypes.func };

export default Header;
