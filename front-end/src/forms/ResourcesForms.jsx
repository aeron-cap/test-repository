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
<<<<<<< HEAD
  Text,
=======
>>>>>>> 0c114ca79a74e41380bde73ba15ce6b5f01a8ce2
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import mockApi from "../utils/mockApi";
<<<<<<< HEAD
import { validateResource } from "../utils/validateResource";
=======
import { validateResources } from "../utils/validationResource";
>>>>>>> 0c114ca79a74e41380bde73ba15ce6b5f01a8ce2

const initialData = {
  firstName: "",
  middleName: "",
  lastName: "",
  type: "",
};

const ResourcesForms = ({ id = "add", onAdd, onExit }) => {
<<<<<<< HEAD
=======
  const [errors, setErrors] = useState({});
>>>>>>> 0c114ca79a74e41380bde73ba15ce6b5f01a8ce2
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const fetched = useRef("add");

<<<<<<< HEAD
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

=======
>>>>>>> 0c114ca79a74e41380bde73ba15ce6b5f01a8ce2
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
<<<<<<< HEAD
    // console.log(id);
    if (id === "add") return;
    if (fetched.current === id) return;
=======
    if (id === -1 || fetched.current) return;
>>>>>>> 0c114ca79a74e41380bde73ba15ce6b5f01a8ce2
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
<<<<<<< HEAD
              <FormLabel>
                <HStack>
                  <Text>First Name </Text>
                  <Text color="red">*</Text>
                </HStack>
              </FormLabel>
=======
              <FormLabel>First Name</FormLabel>
>>>>>>> 0c114ca79a74e41380bde73ba15ce6b5f01a8ce2
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
