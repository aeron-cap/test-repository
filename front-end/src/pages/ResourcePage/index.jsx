import { Stack, Center, Card, CardBody, Box } from "@chakra-ui/react";
import Resources from "../../components/Resources/Resources";
import { useState } from "react";
import initialData from "./resources.json";
import ResourcesForms from "../../forms/ResourcesForms";
import Heading from "./Heading";

const ResourcesPage = () => {
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
          {!isAdding && <Resources data={data} onDelete={handleDelete} />}
          {isAdding && (
            <Card w="container.md">
              <CardBody>
                <ResourcesForms
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

ResourcesPage.propTypes = {};

export default ResourcesPage;
