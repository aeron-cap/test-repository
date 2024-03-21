import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Button,
  Input,
  FormErrorMessage,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { validateRequests } from "../../utils/validateRequests";
import { useRequest } from "../../contexts/_useContexts";

const Form = () => {
  const {
    id,
    formData,
    dispatch,
    handleAddRequest,
    handleCancel,
    handleResetData,
    isEditing,
  } = useRequest();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData((prevData) => ({ ...prevData, [name]: value }));
    dispatch({ type: "ON_INPUTCHANGE", name, value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const validator = validateRequests(formData);
    if (validator.isValid) {
      handleAddRequest(formData);
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
    <form onSubmit={handleAdd} data-test-id="requests-form">
      <Stack w="container.md">
        <FormControl isReadOnly={!isEditing} isInvalid={errors?.client}>
          <FormLabel>Client Name</FormLabel>
          <Input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.client}</FormErrorMessage>
        </FormControl>
        <FormControl isReadOnly={!isEditing} isInvalid={errors?.project}>
          <FormLabel>Project Name</FormLabel>
          <Input
            type="text"
            name="project"
            value={formData.project}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.project}</FormErrorMessage>
        </FormControl>
        <FormControl isReadOnly={!isEditing} isInvalid={errors?.subject}>
          <FormLabel>Subject</FormLabel>
          <Input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.subject}</FormErrorMessage>
        </FormControl>
        <FormControl isReadOnly={!isEditing}>
          <FormLabel>Description</FormLabel>
          <Textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>
        <HStack justify="flex-end">
          {!isEditing && (
            <>
              <Button
                data-test-id="requests-form-cancel"
                colorScheme="gray"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                data-test-id="requests-form-submit"
                colorScheme="gray"
                type="button"
                onClick={() => dispatch({ type: "SET_EDIT", isEditing: true })}
              >
                {id === "add" ? `Add` : `Update`} Requests
              </Button>
            </>
          )}
          {isEditing && (
            <>
              <Button colorScheme="gray" type="button" onClick={handleReset}>
                Reset
              </Button>
              <Button
                data-test-id="requests-form-cancel"
                colorScheme="gray"
                type="button"
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                data-test-id="requests-form-submit"
                colorScheme="green"
                type="submit"
              >
                {id === "add" ? `Add` : `Update`} Request
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
