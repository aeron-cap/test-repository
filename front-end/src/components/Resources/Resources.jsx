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
import { Fragment } from "react";
import PropTypes from "prop-types";

const Resources = ({ data = [] }) => {
  return (
    <Fragment>
      <TableContainer w="container.md">
        <Table
          bg="white"
          borderRadius="md"
          variant="striped"
          colorScheme="teal"
          data-test-id="resource-table"
        >
          <Thead position="sticky">
            <Tr>
              <Th>Name</Th>
              <Th>Type</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.length > 0 &&
              data.map((resources = {}, id) => {
                return (
                  <LinkBox as={Tr} key={`resources-${id}`}>
                    <Td>
                      <LinkOverlay href={`/resources/${resources?.id}`}>
                        {`${resources?.firstName}${
                          resources?.middleName
                            ? ` ${resources.middleName} `
                            : ``
                        }${resources?.lastName}`}
                      </LinkOverlay>
                    </Td>
                    <Td>{resources?.type}</Td>
                  </LinkBox>
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
