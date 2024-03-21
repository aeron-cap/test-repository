import { Stack, Center, Card, CardBody, Box, VStack } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import mockApi from "../../utils/mockApi";
import Requests from "../../components/Requests/Requests";
import Header from "./Heading";

const RequestPage = () => {
  const [requestData, setRequestData] = useState([]);
  const fetched = useRef(false); //marker for obtained data

  const loadData = () => {
    if (fetched.current) return;
    const requestData = mockApi("GET", "/requests");
    const { status = false, data = [] } = requestData;
    if (status) {
      fetched.current = true;
      setRequestData(data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Center width="100%">
      <Stack>
        <Stack>
          <Header />
          <Box direction="column" height="100vh">
            <Requests data={requestData} />
          </Box>
        </Stack>
      </Stack>
    </Center>
  );
};

RequestPage.propTypes = {};

export default RequestPage;
