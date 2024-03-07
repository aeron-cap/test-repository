import projects from "./projects.json";
import { Box, SimpleGrid, Text, Heading } from "@chakra-ui/react";
import { Fragment } from "react";

const data = projects;

function Projects() {
  return (
    <Fragment>
      <Box>
        <Heading size="xl" paddingTop={10} paddingBottom={5}>
          Projects
        </Heading>
        <SimpleGrid columns={2} spacing={4} borderWidth="1px" borderRadius="lg">
          {data.map((val, key) => {
            return (
              <Box
                key={key}
                p={4}
                borderWidth="1px"
                borderRadius="lg"
                bg="white"
              >
                <Heading size="md">{val.name}</Heading>
                <Text color="gray.400">{val.alias}</Text>
                <Text>{val.description}</Text>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Fragment>
  );
}
export default Projects;
