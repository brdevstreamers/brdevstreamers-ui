import { useAuth0 } from "@auth0/auth0-react";
import { Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";
import { UserInteractionType } from "../../../model/UserInteractionModel";
import { logUserInteraction } from "../../../service/StatsService";

export default function RedirectPage() {
  const { username } = useParams();
  const { isAuthenticated, user } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated && username) {
      (async () => {
        await logUserInteraction(
          username,
          UserInteractionType.STREAM_CLICK,
          isAuthenticated,
          user?.nickname,
        );
        window.location.href = `https://twitch.tv/${username}`;
      })();
    }
  }, [isAuthenticated]);

  return (
    <>
      <Text color="primary.400" fontWeight="semibold">
        Loading...
      </Text>
    </>
  );
}
