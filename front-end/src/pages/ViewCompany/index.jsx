import { Box, Stack, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Heading from "./Heading";
import CompanyProvider from "../../contexts/Company";
import Footer from "./footer";
import Form from "./form";

const ViewCompany = () => {
  const { id = "add" } = useParams();

  return (
    <CompanyProvider id={id}>
      <Center width="100%" height="100%">
        <Stack>
          <Heading />
          <Box bg="white" borderRadius="md" padding={5}>
            <Form />
          </Box>
          <Footer />
        </Stack>
      </Center>
    </CompanyProvider>
  );
};

ViewCompany.propTypes = {};

export default ViewCompany;
