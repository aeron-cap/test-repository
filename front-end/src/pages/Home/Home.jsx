import { Stack, Center } from "@chakra-ui/react";
import "./home.css";

function Home() {
  return (
    <Stack direction="column" justify="center" height="100vh" width="90vw">
      <Center fontSize="50px" fontWeight="medium">
        Hello World!!
      </Center>
    </Stack>
  );
}

export default Home;
