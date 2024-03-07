import { Fragment } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Flex,
  Button,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const Companies = ({ data = [], onDelete = () => {} }) => {
  return (
    <Fragment>
      <TableContainer minWidth="50vw" p={5}>
        <Table bg="white" borderRadius="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Contact Person</Th>
              <Th>E mail</Th>
              <Th>Address</Th>
              <Th>Contact Number</Th>
              <Th isNumeric>
                <Center>Actions</Center>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.length > 0 &&
              data.map((companies = {}, companyIndex) => {
                return (
                  <Tr key={`company-${companyIndex}`}>
                    <Td>{companies?.name}</Td>
                    <Td>{companies?.contactPerson}</Td>
                    <Td>{companies?.email}</Td>
                    <Td>{companies?.address}</Td>
                    <Td>{companies?.contactNumber}</Td>
                    <Td isNumeric>
                      <Flex justifyContent="center" alignItems="center">
                        <Button
                          variant="outline"
                          colorScheme="red"
                          size="m"
                          onClick={() => onDelete(companyIndex)}
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

Companies.propTypes = { data: PropTypes.array, onDelete: PropTypes.func };

export default Companies;
