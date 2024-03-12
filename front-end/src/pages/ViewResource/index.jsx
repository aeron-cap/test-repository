import { Box, Button, Stack, Center } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ResourcesForms from "../../forms/ResourcesForms";
import mockApi from "../../utils/mockApi";
import Heading from "./Heading";

const ViewResource = () => {
  const { id = "add" } = useParams();
  const navigate = useNavigate();

  const handleAdd = (data) => {
    let method = "POST";
    let endpoint = "/resources";
    if (data?.id > -1) {
      method = "PUT";
      endpoint = `/resources/${data?.id}`;
    }
    const requestData = mockApi(method, endpoint, data);
    const { status = false, data: newData = {} } = requestData;
    if (status && !(data?.id > -1)) {
      navigate(`/resources/${newData?.id}`);
      alert("New Resource added");
    } else {
      alert("Resource updated");
    }
  };

  const handleDelete = () => {
    mockApi("DELETE", `/resources/${id}`);
    navigate("/resources");
    alert("Resource deleted");
  };

  const handleCancel = () => {
    navigate("/resources");
  };

  const isExistingResource = id == "add";

  return (
    <Center width="100%" height="100%">
      <Stack>
        <Heading />
        <Box bg="white" borderRadius="md" padding={5}>
          <ResourcesForms id={id} onAdd={handleAdd} onExit={handleCancel} />
          {isExistingResource || (
            <Button colorScheme="red" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Box>
      </Stack>
    </Center>
  );
};

ViewResource.propTypes = {};

export default ViewResource;
