import { Box, Button, Stack, Center } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForms from "../../forms/ProjectsForms";
import mockApi from "../../utils/mockApi";
import Heading from "../ViewProjects/Heading";

const ViewProjects = () => {
  const { id = "add" } = useParams();
  const navigate = useNavigate();

  const handleAdd = (data) => {
    let method = "POST";
    let endpoint = "/projects";
    if (data?.id > -1) {
      method = "PUT";
      endpoint = `/projects/${data?.id}`;
    }
    mockApi(method, endpoint, data);
  };

  const handleDelete = () => {
    mockApi("DELETE", `/projects/${id}`);
    navigate("/projects");
  };

  const handleCancel = () => {
    navigate("/projects");
  };

  const isExistingProject = id == "add";

  return (
    <Center width="100%" height="100%">
      <Stack>
        <Heading />
        <Box bg="white" borderRadius="md" padding={5}>
          <ProjectForms id={id} onAdd={handleAdd} onExit={handleCancel} />
          {isExistingProject || (
            <Button colorScheme="red" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Box>
      </Stack>
    </Center>
  );
};

ViewProjects.propTypes = {};

export default ViewProjects;
