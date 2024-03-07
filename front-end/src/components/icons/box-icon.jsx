import { Icon } from "@chakra-ui/react";
import { FaBox } from "react-icons/fa";

function BoxIcon({ size }) {
  return <Icon as={FaBox} boxSize={size} />;
}

export default BoxIcon;
