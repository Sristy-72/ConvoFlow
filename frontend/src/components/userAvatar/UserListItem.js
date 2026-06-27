import { Avatar, Box, Text } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="rgba(15, 23, 42, 0.86)"
      _hover={{
        background: "rgba(8, 145, 178, 0.8)",
        color: "white",
        borderColor: "rgba(103, 232, 249, 0.5)",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="white"
      px={3}
      py={2}
      mb={2}
      borderRadius="8px"
      borderWidth="1px"
      borderColor="rgba(148, 163, 184, 0.18)"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text fontWeight="700">{user.name}</Text>
        <Text fontSize="xs" color="rgba(226, 232, 240, 0.78)">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
