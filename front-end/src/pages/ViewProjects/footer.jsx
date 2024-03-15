import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useProject } from "../../contexts/_useContexts";

const Footer = () => {
  const { id, handleDeleteProject } = useProject();
  console.log(id);

  return (
    <>
      <Box padding={3}>
        {id > -1 && (
          <Button colorScheme="red" size="md" onClick={handleDeleteProject}>
            Delete
          </Button>
        )}
      </Box>
    </>
  );
};

Footer.propTypes = {};

export default Footer;
