import { Stack, Center, Button } from "@chakra-ui/react";
import mockApi from "../../utils/mockApi";
import { Outlet } from "react-router-dom";

function Home() {
  const handleCancel = () => {
    mockApi("POST", "/reset-data");
    window.location.reload();
  };

  return (
    <Stack direction="column" justify="center" height="100vh" width="90vw">
      <Center fontSize="50px" fontWeight="medium">
        <Button colorScheme="blue" onClick={handleCancel}>
          Reset
        </Button>
      </Center>
      <Outlet />
    </Stack>
  );
}

export default Home;
