import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Spacer,
  Button,
  Input,
  ButtonGroup,
  Center,
  Box,
  FormErrorMessage,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import mockApi from "../utils/mockApi";
import { validateResources } from "../utils/validationResource";

const initialData = {
  firstName: "",
  middleName: "",
  lastName: "",
  type: "",
};

const ResourcesForms = ({ id = "add", onAdd, onExit }) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialData);
  const fetched = useRef(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const validator = validateResources(formData);
    const { isValid = false, errors = {} } = validator;

    if (isValid) {
      onAdd(formData);
      setErrors({});
      setFormData(initialData);
      onExit();
    } else {
      setErrors(errors);
    }
  };

  const handleBack = () => {
    setFormData(initialData);
    onExit();
  };

  useEffect(() => {
    if (id === -1 || fetched.current) return;
    const requestData = mockApi("GET", `/resources/${id}`);
    const { status = false, data = {} } = requestData;
    if (status) {
      fetched.current = true;
      setFormData(data);
    }
  }, [id]);

  return (
    <form onSubmit={handleAdd}>
      <Center>
        <Box w="container.md">
          <Stack>
            <FormControl isInvalid={errors?.firstName}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors?.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl>
              <FormLabel>Middle Name</FormLabel>
              <Input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
            </FormControl>
            <HStack>
              <Spacer />
              <ButtonGroup>
                <Button colorScheme="gray" type="button" onClick={handleBack}>
                  Back
                </Button>
                <Button colorScheme="green" type="submit">
                  {id === "add" ? `Add` : `Update`} Resource
                </Button>
              </ButtonGroup>
              <Spacer />
            </HStack>
          </Stack>
        </Box>
      </Center>
    </form>
  );
};

ResourcesForms.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onAdd: PropTypes.func,
  onExit: PropTypes.func,
};

export default ResourcesForms;
