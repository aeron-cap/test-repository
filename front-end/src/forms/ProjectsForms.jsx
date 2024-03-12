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
import { useEffect, useRef, useState } from "react";
import mockApi from "../utils/mockApi";

const initialData = {
  name: "",
  description: "",
  alias: "",
};

const ProjectForms = ({ id = -1, onAdd, onExit }) => {
  const [formData, setFormData] = useState(initialData);
  const fetched = useRef(false);

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

  useEffect(() => {
    // console.log(id);
    if (id === -1 || fetched.current) return;
    const requestData = mockApi("GET", `/projects/${id}`);
    const { status = false, data = {} } = requestData;
    if (status) {
      fetched.current = true;
      setFormData(data);
    }
  }, [id]);

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
              {id === "add" ? `Add` : `Update`} Project
            </Button>
          </ButtonGroup>
          <Spacer />
        </HStack>
      </Stack>
    </form>
  );
};

ProjectForms.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onAdd: PropTypes.func,
  onExit: PropTypes.func,
};

export default ProjectForms;
