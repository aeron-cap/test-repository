import {
  Stack,
  Center,
  Card,
  CardBody,
  Box,
  VStack,
  Grid,
} from "@chakra-ui/react";
import Projects from "../../components/Projects/Projects";
import initialData from "./projects.json";
import { useState } from "react";
import ProjectForms from "../../forms/ProjectsForms";
import Heading from "./Heading";

const ProjectsPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState(initialData);

  const handleAdd = (newData = {}) => {
    setData((prevData) => {
      return [...prevData, newData];
    });
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <Center width="100%">
      <Stack>
        <Heading isAdding={isAdding} toggle={() => setIsAdding(!isAdding)} />
        <VStack>
          <Center>
            <Box direction="column" height="100vh" minW="container.md">
              {!isAdding && <Projects data={data} onDelete={handleDelete} />}
              {isAdding && (
                <Card>
                  <CardBody>
                    <ProjectForms
                      onAdd={handleAdd}
                      onExit={() => setIsAdding(false)}
                    />
                  </CardBody>
                </Card>
              )}
            </Box>
          </Center>
        </VStack>
      </Stack>
    </Center>
  );
};

ProjectsPage.propTypes = {};

export default ProjectsPage;
