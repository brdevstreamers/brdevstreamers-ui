import { useAuth0 } from "@auth0/auth0-react";
import { CircularProgress, Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { TwitchUser } from "../../types/twitch-user.types";
import config from "../../utils/config";

export default function LoginPage() {
  const { setAuthState } = useAuth();
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0<TwitchUser>();

  const handleLogin = async () => {
    const twitchToken = await getAccessTokenSilently({
      audience: config.auth0ClientAudience,
    });

    setAuthState({ token: twitchToken, user });

    document.location.href = "/";
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleLogin();
    }
  }, [isAuthenticated]);

  return (
    <Container centerContent>
      <CircularProgress mt="10" isIndeterminate color="primary.500" size="120px" />
    </Container>
  );
}
