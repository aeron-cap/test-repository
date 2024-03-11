import { Stack, Center, Box } from "@chakra-ui/react";
import Resources from "../../components/Resources/Resources";
import { useEffect, useState, useRef } from "react";
import Heading from "./Heading";
import mockApi from "../../utils/mockApi";

const ResourcesPage = () => {
  const [resourcesData, setResourceData] = useState([]);
  const fetched = useRef(false);

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
        <Heading />
        <Box direction="column" height="100vh">
          <Resources data={resourcesData} />
        </Box>
      </Stack>
    </Center>
  );
};

ResourcesPage.propTypes = {};

export default ResourcesPage;
