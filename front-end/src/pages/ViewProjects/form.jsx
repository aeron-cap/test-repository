import {
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { validateProject } from "../../utils/validateProjects";
import { useProject } from "../../contexts/_useContexts";

const Form = () => {
  const {
    id,
    formData,
    dispatch,
    handleAddProject,
    handleCancel,
    handleResetData,
    isEditing,
  } = useProject();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData((prevData) => ({ ...prevData, [name]: value }));
    dispatch({ type: "ON_INPUTCHANGE", name, value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const validator = validateProject(formData);
    if (validator.isValid) {
      handleAddProject(formData);
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
      <Stack w="container.md">
        <FormControl
          isRequired
          isInvalid={errors?.name}
          isReadOnly={!isEditing}
        >
          <FormLabel>
            <HStack>
              <Text>Project Name</Text>
              <Text color="red">*</Text>
            </HStack>
          </FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.name}</FormErrorMessage>
        </FormControl>
        <FormControl>
          <FormLabel>Alias</FormLabel>
          <Input
            type="text"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl
          isRequired
          isInvalid={errors?.description}
          isReadOnly={!isEditing}
        >
          <FormLabel>
            <HStack>
              <Text>Description</Text>
              <Text color="red">*</Text>
            </HStack>
          </FormLabel>
          <Input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.description}</FormErrorMessage>
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
                onClick={() => dispatch({ type: "SET_EDIT", isEditing: true })}
              >
                {id === "add" ? `Add` : `Update`} Project
              </Button>
            </>
          )}
          {isEditing && (
            <>
              <Button colorScheme="gray" type="button" onClick={handleReset}>
                Reset
              </Button>
              <Button colorScheme="gray" type="button" onClick={handleBack}>
                Back
              </Button>
              <Button colorScheme="green" type="submit">
                {id === "add" ? `Add` : `Update`} Project
              </Button>
            </>
          )}
        </HStack>
      </Stack>
    </form>
  );
};

Form.propTypes = {};

export default Form;
