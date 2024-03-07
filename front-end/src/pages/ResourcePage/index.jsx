import { Stack, Center, Card, CardBody, Box } from "@chakra-ui/react";
import Resources from "../../components/Resources/Resources";
import { useState } from "react";
import initialData from "./resources.json";
import ResourcesForms from "../../forms/ResourcesForms";

const ResourcesPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [data, setData] = useState(initialData);

  const handleAdd = (newData = {}) => {
    setData((prevData) => {
      return [...prevData, newData];
    });
  };

  return (
    <Center width="100vw">
      <Stack>
        <Box direction="column" height="100vh">
          {!isAdding && <Resources data={data} />}
          {isAdding && (
            <Card w="container.md">
              <CardBody>
                <ResourcesForms onAdd={handleAdd} />
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
