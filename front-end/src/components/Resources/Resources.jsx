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
import { Fragment } from "react";
import PropTypes from "prop-types";

const Resources = ({ data = [] }) => {
  return (
    <Fragment>
      <TableContainer minWidth="50vw" p={5}>
        <Heading size="xl" paddingTop={10} paddingBottom={5}>
          Resources
        </Heading>
        <Table bg="white" borderRadius="md">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.length > 0 &&
              data.map((resources = {}, resourceIndex) => {
                return (
                  <Tr key={`resources-${resourceIndex}`}>
                    <Td>
                      {`${resources?.firstName}${
                        resources?.middleName ? ` ${resources.middleName} ` : ``
                      }${resources?.lastName}`}
                    </Td>
                    <Td>{resources?.type}</Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

Resources.propTypes = { data: PropTypes.array };

export default Resources;
