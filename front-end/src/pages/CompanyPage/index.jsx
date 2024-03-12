import { Stack, Center, Card, CardBody, Box } from "@chakra-ui/react";
import Companies from "../../components/Companies/Companies";
import { useEffect, useState, useRef } from "react";
import Heading from "./Heading";
import mockApi from "../../utils/mockApi";

const CompaniesPage = () => {
  const [companyData, setCompanyData] = useState([]);
  const fetched = useRef(false); //marker for obtained data

  const loadData = () => {
    if (fetched.current) return;
    const requestData = mockApi("GET", "/companies");
    const { status = false, data = [] } = requestData;
    if (status) {
      fetched.current = true;
      setCompanyData(data);
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
          <Companies data={companyData} />
        </Box>
      </Stack>
    </Center>
  );
};

CompaniesPage.propTypes = {};

export default CompaniesPage;
