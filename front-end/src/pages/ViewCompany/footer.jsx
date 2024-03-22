import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { useCompany } from "../../contexts/_useContexts";

const Footer = () => {
  const { id, handleDeleteCompany } = useCompany();
  console.log(id);

  return (
    <>
      <Box padding={3}>
        {id > -1 && (
          <Button
            data-test-id="delete-company"
            colorScheme="red"
            size="md"
            onClick={handleDeleteCompany}
          >
            Delete
          </Button>
        )}
      </Box>
    </>
  );
};

Footer.propTypes = {};

export default Footer;
