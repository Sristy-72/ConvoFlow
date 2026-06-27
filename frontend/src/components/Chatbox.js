import { Box } from "@chakra-ui/react";
import "./styles.css";
import SingleChat from "./SingleChat";
import { ChatState } from "../Context/ChatProvider";

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <Box
      display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
      alignItems="center"
      flexDir="column"
      p={3}
      bg="#07111f"
      w={{ base: "100%", md: "68%" }}
      borderRadius="8px"
      borderWidth="1px"
      borderColor="rgba(148, 163, 184, 0.22)"
      boxShadow="0 22px 70px rgba(0, 0, 0, 0.3)"
      overflow="hidden"
      minH={0}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </Box>
  );
};

export default Chatbox;
