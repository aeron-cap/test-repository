import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useRequest } from "../../contexts/_useContexts";

const Footer = () => {
  const { id, handleDeleteRequest } = useRequest();
  console.log(id);

  return (
    <>
      <Box padding={3}>
        {id > -1 && (
          <Button colorScheme="red" size="md" onClick={handleDeleteRequest}>
            Delete
          </Button>
        )}
      </Box>
    </>
  );
};

Footer.propTypes = {};

export default Footer;
