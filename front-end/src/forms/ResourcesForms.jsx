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
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import mockApi from "../utils/mockApi";
import { validateResource } from "../utils/validateResource";

const initialData = {
  firstName: "",
  middleName: "",
  lastName: "",
  type: "",
};

const ResourcesForms = ({ id = "add", onAdd, onExit }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const fetched = useRef("add");

  const handleAdd = (e) => {
    e.preventDefault();
    const validator = validateResource(formData);
    const { isValid = false, errors = {} } = validator;

    if (isValid) {
      onAdd(formData);
      setErrors({});
      onExit();
    } else {
      setErrors(errors);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  const handleBack = () => {
    setFormData(initialData);
    onExit();
  };

  useEffect(() => {
    // console.log(id);
    if (id === "add") return;
    if (fetched.current === id) return;
    const requestData = mockApi("GET", `/resources/${id}`);
    const { status = false, data = {} } = requestData;
    if (status) {
      fetched.current = id;
      setFormData(data);
    }
  }, [id]);

  return (
    <form onSubmit={handleAdd}>
      <Center>
        <Box w="container.md">
          <Stack>
            <FormControl isInvalid={errors?.firstName}>
              <FormLabel>
                <HStack>
                  <Text>First Name </Text>
                  <Text color="red">*</Text>
                </HStack>
              </FormLabel>
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
            <FormControl isInvalid={errors?.lastName}>
              <FormLabel>
                <HStack>
                  <Text>Last Name </Text>
                  <Text color="red">*</Text>
                </HStack>
              </FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors?.lastName}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.type}>
              <FormLabel>
                <HStack>
                  <Text>Type</Text>
                  <Text color="red">*</Text>
                </HStack>
              </FormLabel>
              <Input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />{" "}
              <FormErrorMessage>{errors?.type}</FormErrorMessage>
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
