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
  Box,
} from "@chakra-ui/react";
import { useCompany } from "../../contexts/_useContexts";
import { validateCompany } from "../../utils/validateCompany";
import { useState } from "react";

const Form = () => {
  const {
    id,
    formData,
    dispatch,
    handleAddCompany,
    handleCancel,
    handleResetData,
    isEditing,
  } = useCompany();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData((prevData) => ({ ...prevData, [name]: value }));
    dispatch({ type: "ON_INPUTCHANGE", name, value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const validator = validateCompany(formData);
    if (validator.isValid) {
      handleAddCompany(formData);
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
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.name}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={errors?.contactPerson}
          isReadOnly={!isEditing}
        >
          <FormLabel>Contact Person</FormLabel>
          <Input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.contactPerson}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={errors?.email}
          isReadOnly={!isEditing}
        >
          <FormLabel>E Mail</FormLabel>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.email}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={errors?.address}
          isReadOnly={!isEditing}
        >
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.address}</FormErrorMessage>
        </FormControl>
        <FormControl
          isRequired
          isInvalid={errors?.contactNumber}
          isReadOnly={!isEditing}
        >
          <FormLabel>Contact Number</FormLabel>
          <Input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.contactNumber}</FormErrorMessage>
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
                {id === "add" ? `Add` : `Update`} Company
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
                {id === "add" ? `Add` : `Update`} Company
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
