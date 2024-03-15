import { Box, Stack, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Heading from "./Heading";
import ProjectProvider from "../../contexts/Projects";
import Footer from "./footer";
import Form from "./form";

const ViewProjects = () => {
  const { id = "add" } = useParams();

  return (
    <ProjectProvider id={id}>
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
    </ProjectProvider>
  );
};

ViewProjects.propTypes = {};

export default ViewProjects;
