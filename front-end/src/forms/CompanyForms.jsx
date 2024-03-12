import {
  FormControl,
  FormLabel,
  HStack,
  Stack,
  Spacer,
  Button,
  Input,
  ButtonGroup,
  FormErrorMessage,
  Text,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import mockApi from "../utils/mockApi";
import { validateCompany } from "../utils/validateCompany";

const initialData = {
  name: "",
  contactPerson: "",
  email: "",
  address: "",
  contactNumber: "",
};

const CompanyForms = ({ id = "add", onAdd, onExit }) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const fetched = useRef("add");

  const handleAdd = (e) => {
    e.preventDefault();
    const validator = validateCompany(formData);
    const { isValid = false, errors = {} } = validator;

    if (isValid) {
      onAdd(formData);
      setErrors({});
      onExit();
    } else {
      setErrors(errors);
    }
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
    if (id === "add") return;
    if (fetched.current === id) return;
    const requestData = mockApi("GET", `/companies/${id}`);
    const { status = false, data = {} } = requestData;
    if (status) {
      fetched.current = id;
      setFormData(data);
    }
  }, [id]);

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

CompanyForms.propTypes = {
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onAdd: PropTypes.func,
  onExit: PropTypes.func,
};

export default CompanyForms;
