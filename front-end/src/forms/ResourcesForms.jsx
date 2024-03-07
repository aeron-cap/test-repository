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
  firstName: "",
  middleName: "",
  lastName: "",
  type: "",
};

const ResourcesForms = ({ onAdd = () => {} }) => {
  const [formData, setFormData] = useState(initialData);

  const handleAdd = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData(initialData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  return (
    <form onSubmit={handleAdd}>
      <Stack>
        <FormControl>
          <FormLabel>First Name</FormLabel>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
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
        <FormControl>
          <FormLabel>Last Name</FormLabel>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </FormControl>
        <HStack>
          <Spacer />
          <ButtonGroup>
            <Button
              colorScheme="gray"
              type="button"
              onClick={() => setFormData(initialData)}
            >
              Clear
            </Button>
            <Button colorScheme="green" type="submit">
              Add Resource
            </Button>
          </ButtonGroup>
          <Spacer />
        </HStack>
      </Stack>
    </form>
  );
};

ResourcesForms.propTypes = { onAdd: PropTypes.function };

export default ResourcesForms;
