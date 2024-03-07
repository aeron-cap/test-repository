import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";

const Projects = ({ data = [], onDelete = () => {} }) => {
  return (
    <Fragment>
      <Box>
        <SimpleGrid columns={2} spacing={4} borderWidth="1px" borderRadius="lg">
          {data?.length > 0 &&
            data.map((projects = {}, projectIndex) => {
              return (
                <Box
                  key={`project-${projectIndex}`}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="white"
                  isNumeric
                >
                  <HStack
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Heading size="md">{projects.name}</Heading>
                    <Button
                      size="m"
                      onClick={() => onDelete(projectIndex)}
                      variant="outline"
                      colorScheme="red"
                    >
                      Delete
                    </Button>
                  </HStack>

                  <Text color="gray.400">{projects.alias}</Text>
                  <Text>{projects.description}</Text>
                </Box>
              );
            })}
        </SimpleGrid>
      </Box>
    </Fragment>
  );
};
Projects.propTypes = { data: PropTypes.array, onDelete: PropTypes.func };

export default Projects;
