import { Stack, Center, Card, CardBody, Box } from "@chakra-ui/react";
import Resources from "../../components/Resources/Resources";
import { useEffect, useState, useRef } from "react";
import ResourcesForms from "../../forms/ResourcesForms";
import Heading from "./Heading";
import mockApi from "../../utils/mockApi";

const ResourcesPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [resourcesData, setResourceData] = useState([]);
  const fetched = useRef(false); //marker for obtained data

  const handleAdd = (data = {}) => {
    let method = "POST";
    let endpoint = "/resources";
    if (data?.id > -1) {
      method = "PUT";
      endpoint = `/resources/${data?.id}`;
    }
    const requestData = mockApi(method, endpoint, data);
    const { status = false, data: newData = {} } = requestData; //request

    if (status) {
      const newResourceData = [...resourcesData];
      if (data?.id > -1) {
        const index = newResourceData.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          newResourceData.splice(index, 1, newData);
        }
      } else {
        newResourceData.push(newData);
      }
      setResourceData(newResourceData);
      setIsAdding(false);
    }
  };

  const handleEditResource = (id) => {
    setIsAdding(true);
    setEditId(id);
    console.log(id);
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
            <Resources
              data={resourcesData}
              onDelete={handleDelete}
              onEdit={handleEditResource}
            />
          )}
          {isAdding && (
            <Card w="container.md">
              <CardBody>
                <ResourcesForms
                  id={editId}
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
