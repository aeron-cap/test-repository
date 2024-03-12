import { Stack, Center, Card, CardBody, Box } from "@chakra-ui/react";
import Companies from "../../components/Companies/Companies";
import { useEffect, useState, useRef } from "react";
import Heading from "./Heading";
import CompanyForms from "../../forms/CompanyForms";
import mockApi from "../../utils/mockApi";

const CompaniesPage = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [companyData, setCompanyData] = useState([]);
  const fetched = useRef(false); //marker for obtained data

  const handleAdd = (data = {}) => {
    let method = "POST";
    let endpoint = "/companies";
    if (data?.id > -1) {
      method = "PUT";
      endpoint = `/companies/${data?.id}`;
    }
    const requestData = mockApi(method, endpoint, data);
    const { status = false, data: newData = {} } = requestData; //request

    if (status) {
      const newCompanyData = [...companyData];
      if (data?.id > -1) {
        const index = newCompanyData.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          newCompanyData.splice(index, 1, newData);
        }
      } else {
        newCompanyData.push(newData);
      }
      setCompanyData(newCompanyData);
      setIsAdding(false);
    }
  };

  const handleEditResource = (id) => {
    setIsAdding(true);
    setEditId(id);
    console.log(id);
  };

  const handleDelete = (id) => {
    const requestData = mockApi("DELETE", `/companies/${id}`);
    const { status = false } = requestData;

    if (status) {
      const newData = [...companyData];
      const index = newData.findIndex((item) => item.id === id);
      console.log(index);
      if (index !== -1) {
        newData.splice(index, 1);
        setCompanyData(newData);
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditId(-1);
  };

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
        <Heading isAdding={isAdding} toggle={() => setIsAdding(!isAdding)} />
        <Box direction="column" height="100vh">
          {!isAdding && (
            <Companies
              data={companyData}
              onDelete={handleDelete}
              onEdit={handleEditResource}
            />
          )}
          {isAdding && (
            <Card w="container.md">
              <CardBody>
                <CompanyForms
                  id={editId}
                  onAdd={handleAdd}
                  onExit={handleCancel}
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
