import { Stack, Center } from "@chakra-ui/react";
import Companies from "../../components/Companies/Companies";

const CompaniesPage = () => {
  return (
    <Stack direction="column" height="100vh" width="90vw">
      <Center>
        <Companies />
      </Center>
    </Stack>
  );
};

export default CompaniesPage;
