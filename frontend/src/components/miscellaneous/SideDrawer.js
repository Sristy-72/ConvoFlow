import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import api from "../../config/axios";
import ChatLoading from "../ChatLoading";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!user) return;

    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await api.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description:
          error.response?.data?.message || "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoading(false);
    }
  };

  const accessChat = async (userId) => {
    if (!user) return;

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await api.post(`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.response?.data?.message || error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setLoadingChat(false);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="rgba(15, 23, 42, 0.92)"
        color="white"
        w="100%"
        p="10px 16px"
        borderBottomWidth="1px"
        borderColor="rgba(148, 163, 184, 0.2)"
        boxShadow="0 12px 40px rgba(0, 0, 0, 0.24)"
        backdropFilter="blur(16px)"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            onClick={onOpen}
            color="white"
            borderRadius="8px"
            _hover={{ bg: "rgba(56, 189, 248, 0.14)" }}
          >
            <i className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Work sans" fontWeight="700">
          ConvoFlow
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              />
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList pl={2} bg="#0f172a" borderColor="rgba(148, 163, 184, 0.25)">
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  bg="#0f172a"
                  _hover={{ bg: "rgba(56, 189, 248, 0.14)" }}
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg="rgba(15, 23, 42, 0.6)"
              color="white"
              rightIcon={<ChevronDownIcon />}
              borderRadius="8px"
              _hover={{ bg: "rgba(56, 189, 248, 0.14)" }}
              _active={{ bg: "rgba(56, 189, 248, 0.22)" }}
            >
              <Avatar
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.pic}
              />
            </MenuButton>
            <MenuList bg="#0f172a" borderColor="rgba(148, 163, 184, 0.25)">
              <ProfileModal user={user}>
                <MenuItem 
                bg="#0f172a"
                  color="white"
                  _hover={{ bg: "rgba(56, 189, 248, 0.14)" }}
                  _focus={{ bg: "rgba(56, 189, 248, 0.14)" }}
                  _active={{ bg: "rgba(56, 189, 248, 0.22)" }}
                >
                  My Profile
                </MenuItem>{" "}
              </ProfileModal>
              <MenuDivider />
              <MenuItem
                bg="#0f172a"
                _hover={{ bg: "rgba(248, 113, 113, 0.16)" }}
                onClick={logoutHandler}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="#0f172a" color="white">
          <DrawerHeader borderBottomWidth="1px" borderColor="rgba(148, 163, 184, 0.2)">
            Search Users
          </DrawerHeader>
          <DrawerBody pt={4}>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                bg="rgba(15, 23, 42, 0.92)"
                borderColor="rgba(148, 163, 184, 0.25)"
                borderRadius="8px"
                _placeholder={{ color: "rgba(226, 232, 240, 0.58)" }}
                _focus={{ borderColor: "#38bdf8" }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                colorScheme="cyan"
                bg="#0891b2"
                color="white"
                borderRadius="8px"
                _hover={{ bg: "#0e7490" }}
              >
                Go
              </Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
