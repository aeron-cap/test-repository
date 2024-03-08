import { Stack, Center, Card, CardBody, Box, VStack } from "@chakra-ui/react";
import Projects from "../../components/Projects/Projects";
import { useEffect, useState, useRef } from "react";
import ProjectForms from "../../forms/ProjectsForms";
import Heading from "./Heading";
import mockApi from "../../utils/mockApi";

const ProjectsPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [projectsData, setProjectData] = useState([]);
  const fetched = useRef(false); //marker for obtained data

  const handleAdd = (data = {}) => {
    let method = "POST";
    let endpoint = "/projects";
    if (data?.id > -1) {
      method = "PUT";
      endpoint = `/projects/${data?.id}`;
    }
    const requestData = mockApi(method, endpoint, data);
    const { status = false, data: newData = {} } = requestData; //request

    if (status) {
      const newProjectData = [...projectsData];
      if (data?.id > -1) {
        const index = newProjectData.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          newProjectData.splice(index, 1, newData);
        }
      } else {
        newProjectData.push(newData);
      }
      setProjectData(newProjectData);
      setIsAdding(false);
    }
  };

  const handleEditResource = (id) => {
    setIsAdding(true);
    setEditId(id);
    console.log(id);
  };

  const handleDelete = (id) => {
    const requestData = mockApi("DELETE", `/projects/${id}`);
    const { status = false } = requestData;

    if (status) {
      const newData = [...projectsData];
      const index = newData.findIndex((item) => item.id === id);
      console.log(index);
      if (index !== -1) {
        newData.splice(index, 1);
        setProjectData(newData);
      }
    }
  };

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
        <Heading isAdding={isAdding} toggle={() => setIsAdding(!isAdding)} />
        <VStack>
          <Center>
            <Box direction="column" height="100vh" minW="container.md">
              {!isAdding && (
                <Projects
                  data={projectsData}
                  onDelete={handleDelete}
                  onEdit={handleEditResource}
                />
              )}
              {isAdding && (
                <Card>
                  <CardBody>
                    <ProjectForms
                      id={editId}
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
