import { Stack, Center } from "@chakra-ui/react";
import Projects from "../../components/Projects/Projects";

const ProjectsPage = () => {
  return (
    <Stack direction="column" height="100vh" width="90vw">
      <Center>
        <Projects />
      </Center>
    </Stack>
  );
};

export default ProjectsPage;
