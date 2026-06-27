import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import api from "../config/axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    if (!user) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await api.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="rgba(15, 23, 42, 0.86)"
      color="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="8px"
      borderWidth="1px"
      borderColor="rgba(148, 163, 184, 0.22)"
      boxShadow="0 22px 70px rgba(0, 0, 0, 0.3)"
      backdropFilter="blur(16px)"
      minH={0}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "24px", md: "26px" }}
        fontFamily="Work sans"
        fontWeight="700"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            display="flex"
            fontSize={{ base: "15px", md: "12px", lg: "15px" }}
            rightIcon={<AddIcon />}
            colorScheme="cyan"
            bg="#0891b2"
            color="white"
            borderRadius="8px"
            _hover={{ bg: "#0e7490" }}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="rgba(2, 6, 23, 0.58)"
        w="100%"
        h="100%"
        borderRadius="8px"
        overflowY="hidden"
        borderWidth="1px"
        borderColor="rgba(148, 163, 184, 0.16)"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={
                  selectedChat?._id === chat._id
                    ? "linear-gradient(135deg, #0891b2, #4f46e5)"
                    : "rgba(15, 23, 42, 0.84)"
                }
                color="white"
                px={3}
                py={3}
                borderRadius="8px"
                borderWidth="1px"
                borderColor={
                  selectedChat?._id === chat._id
                    ? "rgba(103, 232, 249, 0.5)"
                    : "rgba(148, 163, 184, 0.12)"
                }
                _hover={{
                  bg: "rgba(30, 41, 59, 0.95)",
                  borderColor: "rgba(56, 189, 248, 0.45)",
                }}
                key={chat._id}
              >
                <Text fontWeight="700">
                  {loggedUser && !chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs" color="rgba(226, 232, 240, 0.82)">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
