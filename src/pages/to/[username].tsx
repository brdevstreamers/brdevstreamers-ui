import { useAuth0 } from "@auth0/auth0-react";
import { Text } from "@chakra-ui/react";
import React from "react";
import { UserInteractionType } from "../../model/UserInteractionModel";
import { logUserInteraction } from "../../service/StatsService";
import { useRouter } from "next/router";


export default function RedirectPage() {
  const router = useRouter();
  const { username } = router.query
  const { isAuthenticated, user } = useAuth0();

  React.useEffect(() => {
    if (isAuthenticated && username) {
      (async () => {
        await logUserInteraction(
          username as string,
          UserInteractionType.STREAM_CLICK,
          isAuthenticated,
          user?.nickname,
        );
        router.push(`https://twitch.tv/${username}`);
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
