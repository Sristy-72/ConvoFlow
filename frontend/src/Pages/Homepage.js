import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

function Homepage() {
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) history.push("/chats");
  }, [history]);

  return (
    <Container maxW="xl" centerContent py={{ base: 6, md: 10 }}>
      <Box
        bg="#07111f"
        w="100%"
        p={4}
        borderRadius="8px"
        borderWidth="1px"
        borderColor="rgba(226, 232, 240, 0.6)"
        boxShadow="0 22px 70px rgba(0, 0, 0, 0.32)"
      >
        <Text fontSize="4xl" fontFamily="Work sans" fontWeight="700">
          ConvoFlow
        </Text>
        <Tabs isFitted variant="soft-rounded" colorScheme="cyan">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default Homepage;
