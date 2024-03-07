import { Stack, Center, Card, CardBody, Box } from "@chakra-ui/react";
import Companies from "../../components/Companies/Companies";
import { useState } from "react";
import initialData from "./companies.json";
import Heading from "./Heading";
import CompanyForms from "../../forms/CompanyForms";

const CompaniesPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState(initialData);

  const handleAdd = (newData = {}) => {
    setData((prevData) => {
      return [...prevData, newData];
    });
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  return (
    <Center width="100%">
      <Stack>
        <Heading isAdding={isAdding} toggle={() => setIsAdding(!isAdding)} />
        <Box direction="column" height="100vh">
          {!isAdding && <Companies data={data} onDelete={handleDelete} />}
          {isAdding && (
            <Card w="container.md">
              <CardBody>
                <CompanyForms
                  onAdd={handleAdd}
                  onExit={() => setIsAdding(false)}
                />
              </CardBody>
            </Card>
          )}
        </Box>
      </Stack>
    </Center>
  );
};

CompaniesPage.propTypes = {};

export default CompaniesPage;
