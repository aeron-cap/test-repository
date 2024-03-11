import { Stack, Center, Card, CardBody, Box, VStack } from "@chakra-ui/react";
import Projects from "../../components/Projects/Projects";
import { useEffect, useState, useRef } from "react";
import Heading from "./Heading";
import mockApi from "../../utils/mockApi";

const ProjectsPage = () => {
  const [projectsData, setProjectData] = useState([]);
  const fetched = useRef(false); //marker for obtained data

  const loadData = () => {
    if (fetched.current) return;
    const requestData = mockApi("GET", "/projects");
    const { status = false, data = [] } = requestData;
    if (status) {
      fetched.current = true;
      setProjectData(data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Center width="100%">
      <Stack>
        <Stack>
          <Heading />
          <Box direction="column" height="100vh">
            <Projects data={projectsData} />
          </Box>
        </Stack>
      </Stack>
    </Center>
  );
};

ProjectsPage.propTypes = {};

export default ProjectsPage;
