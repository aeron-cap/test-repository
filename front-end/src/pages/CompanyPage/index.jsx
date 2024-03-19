import { Stack, HStack, Card, CardBody, Box } from "@chakra-ui/react";
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
    <Stack maxW="container.md" mx="auto">
      <Heading />
      <HStack>
        <Companies data={companyData} />
      </HStack>
    </Stack>
  );
};

CompaniesPage.propTypes = {};

export default CompaniesPage;
