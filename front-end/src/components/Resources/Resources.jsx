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
  ButtonGroup,
} from "@chakra-ui/react";
import { Fragment } from "react";
import PropTypes from "prop-types";

const Resources = ({ data = [], onDelete = () => {}, onEdit = () => {} }) => {
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
                        <ButtonGroup>
                          <Button
                            colorScheme="green"
                            size="sm"
                            onClick={() => onEdit(resources?.id)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            colorScheme="red"
                            size="sm"
                            onClick={() => onDelete(resources?.id)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
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

Resources.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Resources;
