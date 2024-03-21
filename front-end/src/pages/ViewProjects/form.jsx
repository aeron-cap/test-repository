import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Button,
  Input,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useProject } from "../../contexts/_useContexts";
import { validateProject } from "../../utils/validateProjects";

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
    <form onSubmit={handleAdd} data-test-id="projects-form">
      <Stack w="container.md">
        <FormControl isReadOnly={!isEditing} isInvalid={errors?.name}>
          <FormLabel>Project Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.name}</FormErrorMessage>
        </FormControl>
        <FormControl isReadOnly={!isEditing}>
          <FormLabel>Alias</FormLabel>
          <Input
            type="text"
            name="alias"
            value={formData.alias}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isReadOnly={!isEditing} isInvalid={errors?.description}>
          <FormLabel>Description</FormLabel>
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
              <Button
                data-test-id="projects-form-cancel"
                colorScheme="gray"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                data-test-id="projects-form-submit"
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
              <Button
                data-test-id="projects-form-cancel"
                colorScheme="gray"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                data-test-id="projects-form-submit"
                colorScheme="green"
                type="submit"
              >
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
