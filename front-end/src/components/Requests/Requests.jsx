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

const Requests = ({ data = [] }) => {
  return (
    <Fragment>
      <Box minW="container.md">
        <SimpleGrid columns={2} spacing={4} borderWidth="1px" borderRadius="lg">
          {data?.length > 0 &&
            data.map((requests = {}, id) => {
              return (
                <LinkBox
                  as={Box}
                  key={`requests-${id}`}
                  p={4}
                  borderWidth="1px"
                  borderRadius="lg"
                  bg="white"
                >
                  <LinkOverlay href={`/requests/${requests?.id}`}>
                    <HStack
                      justifyContent="space-between"
                      alignItems="flex-start"
                    >
                      <Heading size="md" color="teal">
                        {requests.subject}
                      </Heading>
                    </HStack>
                    <Text color="gray.400">
                      {requests.client} {requests.project}
                    </Text>
                    <Text>{requests.description}</Text>
                  </LinkOverlay>
                </LinkBox>
              );
            })}
        </SimpleGrid>
      </Box>
    </Fragment>
  );
};

Requests.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Requests;
