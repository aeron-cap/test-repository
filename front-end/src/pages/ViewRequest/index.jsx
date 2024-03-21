import { Box, Stack, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import RequestsProvider from "../../contexts/Requests";
import Header from "./Heading";
import Form from "./form";
import Footer from "./footer";

const ViewRequests = () => {
  const { id = "add" } = useParams();

  return (
    <RequestsProvider id={id}>
      <Center width="100%" height="100%">
        <Stack>
          <Header />
          <Box bg="white" borderRadius="md" padding={5}>
            <Form />
          </Box>
          <Box borderRadius="md" padding={2} textAlign="right">
            <Footer />
          </Box>
        </Stack>
      </Center>
    </RequestsProvider>
  );
};

ViewRequests.propTypes = {};

export default ViewRequests;
