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
  contactPerson: "",
  email: "",
  address: "",
  contactNumber: "",
};

const CompanyForms = ({ id = -1, onAdd = () => {}, onExit = () => {} }) => {
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
    const requestData = mockApi("GET", `/companies/${id}`);
    const { status = false, data = {} } = requestData;
    if (status) {
      fetched.current = true;
      setFormData(data);
    }
  }, [id]);

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
              {id === -1 ? `Add` : `Update`} Company Details
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

CompanyForms.propTypes = {
  id: PropTypes.number,
  onAdd: PropTypes.func,
  onExit: PropTypes.func,
};

export default CompanyForms;
