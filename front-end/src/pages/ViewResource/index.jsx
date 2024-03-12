import { Box, Button, Stack, Center } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import ResourcesForms from "../../forms/ResourcesForms";
import mockApi from "../../utils/mockApi";
import Heading from "./Heading";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: "Resource Added",
        confirmButtonText: "Ok",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Resource Updated",
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
        mockApi("DELETE", `/resources/${id}`);
        navigate("/resources/");
      } else {
        navigate(`/resources/${id}`);
      }
    });
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
