import { Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

export default function RedirectPage() {
  const { username } = useParams();

  React.useEffect(() => {
    window.location.href = `https://twitch.tv/${username}`;
  }, [username]);

  return (
    <>
      <Text color="primary.400" fontWeight="semibold">
        Loading...
      </Text>
    </>
  );
}
