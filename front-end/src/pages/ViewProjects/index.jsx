import { Box, Stack, Center } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Heading from "../ViewProjects/Heading";
import Form from "./form";
import Footer from "./footer";
import ProjectProvider from "../../contexts/Projects";

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
