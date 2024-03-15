import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useCompany } from "../../contexts/_useContexts";

const Footer = () => {
  const { id, handleDeleteCompany } = useCompany();
  console.log(id);

  return (
    <>
      <Box>
        {id > -1 && (
          <Button colorScheme="red" size="sm" onClick={handleDeleteCompany}>
            Delete
          </Button>
        )}
      </Box>
    </>
  );
};

Footer.propTypes = {};

export default Footer;
