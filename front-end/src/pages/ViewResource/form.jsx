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
import { useState } from "react";
import { useResource } from "../../contexts/_useContexts";
import { validateResource } from "../../utils/validateResource";

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
    <form onSubmit={handleAdd}>
      <Center>
        <Box w="container.md">
          <Stack>
            <FormControl
              isRequired
              isReadOnly={!isEditing}
              isInvalid={errors?.firstName}
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
            <FormControl isRequired isReadOnly={!isEditing}>
              <FormLabel>Middle Name</FormLabel>
              <Input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl
              isRequired
              isReadOnly={!isEditing}
              isInvalid={errors?.lastName}
            >
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors?.lastName}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isReadOnly={!isEditing}
              isInvalid={errors?.type}
            >
              <FormLabel>Type</FormLabel>
              <Input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
              />
              <FormErrorMessage>{errors?.type}</FormErrorMessage>
            </FormControl>
            <HStack justify="flex-end">
              {!isEditing && (
                <>
                  <Button colorScheme="gray" type="button" onClick={handleBack}>
                    Back
                  </Button>
                  <Button
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
                  <Button colorScheme="gray" type="button" onClick={handleBack}>
                    Back
                  </Button>
                  <Button colorScheme="green" type="submit">
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
