import { Box, Button, Stack, Center } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import CompanyForms from "../../forms/CompanyForms";
import mockApi from "../../utils/mockApi";
import Heading from "./Heading";
import Swal from "sweetalert2";

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
    const requestData = mockApi(method, endpoint, data);
    const { status = false, data: newData = {} } = requestData;
    if (status && !(data?.id > -1)) {
      navigate(`/companies/${newData?.id}`);
      Swal.fire({
        title: "Company Added",
        confirmButtonText: "Ok",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Company Updated",
        confirmButtonText: "Ok",
        icon: "success",
      });
    }
  };

  const handleDelete = () => {
    Swal.fire({
      title: "You are about to delete comapny information",
      confirmButtonText: "Yes",
      confirmButtonColor: "red",
      showCancelButton: "true",
      cancelButtonText: "No",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        mockApi("DELETE", `/companies/${id}`);
        navigate("/companies/");
      } else {
        navigate(`/companies/${id}`);
      }
    });
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
