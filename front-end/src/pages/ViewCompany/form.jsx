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
import { useCompany } from "../../contexts/_useContexts";
import { validateCompany } from "../../utils/validateCompany";
import { useState } from "react";

const Form = () => {
  const { id, formData, setFormData, handleAddCompany, handleCancel } =
    useCompany();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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

  return (
    <form onSubmit={handleAdd}>
      <Stack w="container.md">
        <FormControl isInvalid={errors?.name}>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.name}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.contactPerson}>
          <FormLabel>Contact Person</FormLabel>
          <Input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.contactPerson}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.email}>
          <FormLabel>E Mail</FormLabel>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.email}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.address}>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.address}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={errors?.contactNumber}>
          <FormLabel>Contact Number</FormLabel>
          <Input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          <FormErrorMessage>{errors?.contactNumber}</FormErrorMessage>
        </FormControl>
        <HStack>
          <Spacer />
          <ButtonGroup>
            <Button colorScheme="gray" type="button" onClick={handleBack}>
              Back
            </Button>
            <Button colorScheme="green" type="submit">
              {id === "add" ? `Add` : `Update`} Company Details
            </Button>
          </ButtonGroup>
          <Spacer />
        </HStack>
      </Stack>
    </form>
  );
};

Form.propTypes = {};

export default Form;
