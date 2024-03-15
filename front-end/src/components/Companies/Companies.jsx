import { Fragment } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

const Companies = ({ data = [] }) => {
  return (
    <Fragment>
      <TableContainer minWidth="50vw" p={5}>
        <Table bg="white" borderRadius="md">
          <Thead>
            <Tr>
              <Th color="teal" fontSize="lg">
                Name
              </Th>
              <Th color="teal" fontSize="lg">
                Contact Person
              </Th>
              <Th color="teal" fontSize="lg">
                E mail
              </Th>
              <Th color="teal" fontSize="lg">
                Address
              </Th>
              <Th color="teal" fontSize="lg">
                Contact Number
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.length > 0 &&
              data.map((companies = {}, id) => {
                return (
                  <LinkBox as={Tr} key={`companies-${id}`}>
                    <LinkOverlay href={`/companies/${companies?.id}`}>
                      <Td>{companies?.name}</Td>
                    </LinkOverlay>
                    <Td>{companies?.contactPerson}</Td>
                    <Td>{companies?.email}</Td>
                    <Td>{companies?.address}</Td>
                    <Td>{companies?.contactNumber}</Td>
                  </LinkBox>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

Companies.propTypes = {
  data: PropTypes.array,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};

export default Companies;
