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
  description: "",
  alias: "",
};

const ProjectForms = ({ onAdd = () => {}, onExit = () => {} }) => {
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
      <Stack width="100%">
        <FormControl>
          <FormLabel>Project Name</FormLabel>
          <Input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
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
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            name="description"
            value={formData.description}
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

ProjectForms.propTypes = { onAdd: PropTypes.func, onExit: PropTypes.func };

export default ProjectForms;
