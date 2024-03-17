import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useResource } from "../../contexts/_useContexts";

const Footer = () => {
  const { id, handleDeleteResource } = useResource();
  console.log(id);

  return (
    <>
      <Box padding={3}>
        {id > -1 && (
          <Button colorScheme="red" size="md" onClick={handleDeleteResource}>
            Delete
          </Button>
        )}
      </Box>
    </>
  );
};

Footer.propTypes = {};

export default Footer;
