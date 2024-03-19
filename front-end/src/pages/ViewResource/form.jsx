import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Button,
  Input,
  Center,
  Box,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { useResource } from "../../contexts/_useContexts";
import { validateResource } from "../../utils/validateResource";

const typeOptions = [
  { label: "Project Manager", value: "PM" },
  { label: "Quality Assurance", value: "QA" },
  { label: "Developer", value: "DEV" },
];

const Form = () => {
  const {
    id,
    formData,
    dispatch,
    handleAddResource,
    handleCancel,
    handleResetData,
    isEditing,
  } = useResource();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData((prevData) => ({ ...prevData, [name]: value }));
    dispatch({ type: "ON_INPUTCHANGE", name, value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const validator = validateResource(formData);
    if (validator.isValid) {
      handleAddResource(formData);
      setErrors({});
    } else {
      setErrors(validator.errors);
    }
  };

  const handleBack = () => {
    handleCancel();
  };

  const handleReset = () => {
    handleResetData();
  };

  return (
    <form onSubmit={handleAdd} data-test-id="resource-form">
      <Center>
        <Box w="container.md">
          <Stack>
            <FormControl
              isReadOnly={!isEditing}
              isInvalid={errors?.firstName}
              //isRequired
            >
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors?.firstName}</FormErrorMessage>
            </FormControl>
            <FormControl isReadOnly={!isEditing}>
              <FormLabel>Middle Name</FormLabel>
              <Input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl isReadOnly={!isEditing} isInvalid={errors?.lastName}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors?.lastName}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors?.type} isReadOnly={!isEditing}>
              <FormLabel>Type</FormLabel>
              <Select
                name="type"
                id="select-resource-type"
                placeholder="Select Resource Type"
                value={formData.type}
                onChange={handleChange}
              >
                {typeOptions.map((type, typeIndex) => (
                  <option key={`typeOption-${typeIndex}`} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </Select>
              <FormErrorMessage>{errors?.type}</FormErrorMessage>
            </FormControl>
            <HStack justify="flex-end">
              {!isEditing && (
                <>
                  <Button
                    data-test-id="resource-form-cancel"
                    colorScheme="gray"
                    type="button"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    data-test-id="resource-form-submit"
                    colorScheme="gray"
                    type="button"
                    onClick={() =>
                      dispatch({ type: "SET_EDIT", isEditing: true })
                    }
                  >
                    {id === "add" ? `Add` : `Update`} Resource
                  </Button>
                </>
              )}
              {isEditing && (
                <>
                  <Button
                    colorScheme="gray"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  <Button
                    data-test-id="resource-form-cancel"
                    colorScheme="gray"
                    type="button"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    data-test-id="resource-form-submit"
                    colorScheme="green"
                    type="submit"
                  >
                    {id === "add" ? `Add` : `Update`} Resource
                  </Button>
                </>
              )}
            </HStack>
          </Stack>
        </Box>
      </Center>
    </form>
  );
};

Form.propTypes = {};

export default Form;
