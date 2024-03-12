import { Box, Button, Stack, Center } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyForms from "../../forms/CompanyForms";
import mockApi from "../../utils/mockApi";
import Heading from "./Heading";

const ViewCompany = () => {
  const { id = "add" } = useParams();
  const navigate = useNavigate();

  const handleAdd = (data) => {
    let method = "POST";
    let endpoint = "/companies";
    if (data?.id > -1) {
      method = "PUT";
      endpoint = `/companies/${data?.id}`;
    }
    mockApi(method, endpoint, data);
  };

  const handleDelete = () => {
    mockApi("DELETE", `/companies/${id}`);
    navigate("/companies");
  };

  const handleCancel = () => {
    navigate("/companies");
  };

  const isExistingCompany = id == "add";

  return (
    <Center width="100%" height="100%">
      <Stack>
        <Heading />
        <Box bg="white" borderRadius="md" padding={5}>
          <CompanyForms id={id} onAdd={handleAdd} onExit={handleCancel} />
          {isExistingCompany || (
            <Button colorScheme="red" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          )}
        </Box>
      </Stack>
    </Center>
  );
};

ViewCompany.propTypes = {};

export default ViewCompany;
