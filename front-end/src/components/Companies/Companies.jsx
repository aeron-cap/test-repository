import { Fragment } from "react";
import companies from "./companies.json";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
} from "@chakra-ui/react";

const data = companies;

function Companies() {
  return (
    <Fragment>
      <TableContainer minWidth="50vw" p={5}>
        <Heading size="xl" paddingTop={10} paddingBottom={5}>
          Companies
        </Heading>
        <Table bg="white" borderRadius="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Contact Person</Th>
              <Th>E mail</Th>
              <Th>Address</Th>
              <Th>Contact Number</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((val, key) => {
              return (
                <Tr key={key}>
                  <Td>{val.name}</Td>
                  <Td>{val.contactPerson}</Td>
                  <Td>{val.email}</Td>
                  <Td>{val.address}</Td>
                  <Td>{val.contactNumber}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}
export default Companies;
