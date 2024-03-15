// import {
//   FormControl,
//   FormLabel,
//   HStack,
//   Stack,
//   Spacer,
//   Button,
//   Input,
//   ButtonGroup,
//   FormErrorMessage,
//   Text,
// } from "@chakra-ui/react";
// import PropTypes from "prop-types";
// import { useEffect, useRef, useState } from "react";
// import mockApi from "../utils/mockApi";
// import { validateProject } from "../utils/validateProjects";
import Form from "../pages/ViewProjects/form";

// const initialData = {
//   name: "",
//   description: "",
//   alias: "",
// };

const ProjectForms = () => {
  //{ id = "add", onAdd, onExit }
  // const [formData, setFormData] = useState(initialData);
  // const [errors, setErrors] = useState({});
  // const fetched = useRef("add");

  // const handleAdd = (e) => {
  //   e.preventDefault();
  //   const validator = validateProject(formData);
  //   const { isValid = false, errors = {} } = validator;

  //   if (isValid) {
  //     onAdd(formData);
  //     setErrors({});
  //     onExit();
  //   } else {
  //     setErrors(errors);
  //   }
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => {
  //     return { ...prevData, [name]: value };
  //   });
  // };

  // const handleBack = () => {
  //   setFormData(initialData);
  //   onExit();
  // };

  // useEffect(() => {
  //   // console.log(id);
  //   if (id === "add") return;
  //   if (fetched.current === id) return;
  //   const requestData = mockApi("GET", `/projects/${id}`);
  //   const { status = false, data = {} } = requestData;
  //   if (status) {
  //     fetched.current = id;
  //     setFormData(data);
  //   }
  // }, [id]);

  return (
    // <form onSubmit={handleAdd}>
    //   <Stack w="container.md">
    //     <FormControl isInvalid={errors?.name}>
    //       <FormLabel>
    //         <HStack>
    //           <Text>Project Name</Text>
    //           <Text color="red">*</Text>
    //         </HStack>
    //       </FormLabel>
    //       <Input
    //         type="text"
    //         name="name"
    //         value={formData.name}
    //         onChange={handleChange}
    //       />
    //       <FormErrorMessage>{errors?.name}</FormErrorMessage>
    //     </FormControl>
    //     <FormControl>
    //       <FormLabel>Alias</FormLabel>
    //       <Input
    //         type="text"
    //         name="alias"
    //         value={formData.alias}
    //         onChange={handleChange}
    //       />
    //     </FormControl>
    //     <FormControl isInvalid={errors?.description}>
    //       <FormLabel>
    //         <HStack>
    //           <Text>Description</Text>
    //           <Text color="red">*</Text>
    //         </HStack>
    //       </FormLabel>
    //       <Input
    //         type="text"
    //         name="description"
    //         value={formData.description}
    //         onChange={handleChange}
    //       />
    //       <FormErrorMessage>{errors?.description}</FormErrorMessage>
    //     </FormControl>
    //     <HStack>
    //       <Spacer />
    //       <ButtonGroup>
    //         <Button colorScheme="gray" type="button" onClick={handleBack}>
    //           Back
    //         </Button>
    //         <Button colorScheme="green" type="submit">
    //           {id === "add" ? `Add` : `Update`} Project
    //         </Button>
    //       </ButtonGroup>
    //       <Spacer />
    //     </HStack>
    //   </Stack>
    // </form>
    <Form />
  );
};

ProjectForms.propTypes = {
  // id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  // onAdd: PropTypes.func,
  // onExit: PropTypes.func,
};

export default ProjectForms;
