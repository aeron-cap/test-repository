import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  Button,
  HStack,
  ButtonGroup,
} from "@chakra-ui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";

const Projects = ({ data = [], onDelete = () => {}, onEdit = () => {} }) => {
  return (
    <Fragment>
      <Box>
        <SimpleGrid columns={2} spacing={4} borderWidth="1px" borderRadius="lg">
          {data?.length > 0 &&
            data.map((projects = {}, id) => {
              return (
                <Box
                  key={`project-${id}`}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="white"
                >
                  <HStack
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Heading size="md">{projects.name}</Heading>
                    <ButtonGroup>
                      <Button
                        size="sm"
                        onClick={() => onEdit(projects?.id)}
                        colorScheme="green"
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onDelete(projects?.id)}
                        variant="outline"
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </ButtonGroup>
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
Projects.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Projects;
