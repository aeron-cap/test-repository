import { Stack, Center, Card, CardBody, Box } from "@chakra-ui/react";
import Resources from "../../components/Resources/Resources";
import { useEffect, useState, useRef } from "react";
import ResourcesForms from "../../forms/ResourcesForms";
import Heading from "./Heading";
import mockApi from "../../utils/mockApi";

const ResourcesPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [resourcesData, setResourceData] = useState([]);
  const fetched = useRef(false); //marker for obtained data

  const handleAdd = (newData = {}) => {
    setResourceData((prevData) => [...prevData, newData]);
  };

  const handleDelete = (id) => {
    const requestData = mockApi("DELETE", `/resources/${id}`);
    const { status = false } = requestData;
    if (status) {
      const newData = [...resourcesData];
      const index = newData.findIndex((item) => item.id === id);
      console.log(index);
      if (index !== -1) {
        newData.splice(index, 1);
        setResourceData(newData);
      }
    }
  };

  const loadData = () => {
    if (fetched.current) return;
    const requestData = mockApi("GET", "/resources");
    const { status = false, data = [] } = requestData;
    if (status) {
      fetched.current = true;
      setResourceData(data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Center width="100%">
      <Stack>
        <Heading isAdding={isAdding} toggle={() => setIsAdding(!isAdding)} />
        <Box direction="column" height="100vh">
          {!isAdding && (
            <Resources data={resourcesData} onDelete={handleDelete} />
          )}
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
