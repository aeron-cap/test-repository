import {
  Box,
  SimpleGrid,
  Text,
  Heading,
  HStack,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";

const Projects = ({ data = [] }) => {
  return (
    <Fragment>
      <Box>
        <SimpleGrid columns={2} spacing={4} borderWidth="1px" borderRadius="lg">
          {data?.length > 0 &&
            data.map((projects = {}, id) => {
              return (
                <LinkBox
                  as={Box}
                  key={`projects-${id}`}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="white"
                >
                  <LinkOverlay href={`/projects/${projects?.id}`}>
                    <HStack
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Heading size="md" color="teal">
                        {projects.name}
                      </Heading>
                    </HStack>
                    <Text color="gray.400">{projects.alias}</Text>
                    <Text>{projects.description}</Text>
                  </LinkOverlay>
                </LinkBox>
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
