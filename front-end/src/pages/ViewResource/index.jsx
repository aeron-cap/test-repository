import { Box, Button, Stack, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Heading from "./Heading";
import Footer from "./footer";
import ResourceProvider from "../../contexts/Resource";
import Form from "./form";

const ViewResource = () => {
  const { id = "add" } = useParams();

  return (
    <ResourceProvider id={id}>
      <Center width="100%" height="100%">
        <Stack>
          <Heading />
          <Box bg="white" borderRadius="md" padding={5}>
            <Form />
          </Box>
          <Box borderRadius="md" padding={2} textAlign="right">
            <Footer />
          </Box>
        </Stack>
      </Center>
    </ResourceProvider>
  );
};

ViewResource.propTypes = {};

export default ViewResource;
