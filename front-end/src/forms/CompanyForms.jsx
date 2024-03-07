import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Spacer,
  Button,
  Input,
  ButtonGroup,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useState } from "react";

const initialData = {
  name: "",
  contactPerson: "",
  email: "",
  address: "",
  contactNumber: "",
};

const CompanyForms = ({ onAdd = () => {}, onExit = () => {} }) => {
  const [formData, setFormData] = useState(initialData);

  const handleAdd = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData(initialData);
    onExit();
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

  return (
    <form onSubmit={handleAdd}>
      <Stack>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Contact Person</FormLabel>
          <Input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>E Mail</FormLabel>
          <Input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Contact Number</FormLabel>
          <Input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
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
              Add Resource
            </Button>
            <Button
              colorScheme="gray"
              type="button"
              onClick={() => setFormData(initialData)}
            >
              Clear
            </Button>
          </ButtonGroup>
          <Spacer />
        </HStack>
      </Stack>
    </form>
  );
};

CompanyForms.propTypes = { onAdd: PropTypes.func, onExit: PropTypes.func };

export default CompanyForms;
