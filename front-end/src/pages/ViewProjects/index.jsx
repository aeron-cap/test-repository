import { Box, Button, Stack, Center } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForms from "../../forms/ProjectsForms";
import mockApi from "../../utils/mockApi";
import Heading from "../ViewProjects/Heading";
import Swal from "sweetalert2";

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
    const requestData = mockApi(method, endpoint, data);
    const { status = false, data: newData = {} } = requestData;
    if (status && !(data?.id > -1)) {
      navigate(`/projects/${newData?.id}`);
      Swal.fire({
        title: "Project Added",
        confirmButtonText: "Ok",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Project Updated",
        confirmButtonText: "Ok",
        icon: "success",
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "You are about to delete",
      confirmButtonText: "Yes",
      confirmButtonColor: "red",
      showCancelButton: "true",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        mockApi("DELETE", `/projects/${id}`);
        navigate("/projects/");
      } else {
        navigate(`/projects/${id}`);
      }
    });
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
