import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";

const Resources = ({ data = [], onDelete = () => {} }) => {
  return (
    <Fragment>
      <TableContainer w="container.md">
        <Table bg="white" borderRadius="md">
          <Thead position="sticky">
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th isNumeric>
                <Center>Actions</Center>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.length > 0 &&
              data.map((resources = {}, id) => {
                return (
                  <Tr key={`resources-${id}`}>
                    <Td>
                      {`${resources?.firstName}${
                        resources?.middleName ? ` ${resources.middleName} ` : ``
                      }${resources?.lastName}`}
                    </Td>
                    <Td>{resources?.type}</Td>
                    <Td isNumeric>
                      <Flex justifyContent="center" alignItems="center">
                        <Button
                          variant="outline"
                          colorScheme="red"
                          size="sm"
                          onClick={() => onDelete(resources?.id)}
                        >
                          Delete
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

Resources.propTypes = { data: PropTypes.array, onDelete: PropTypes.func };

export default Resources;
