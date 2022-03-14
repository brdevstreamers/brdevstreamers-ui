import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Button
      bgColor={"primary.500"}
      borderRadius={"sm"}
      _hover={{ bgColor: "primary.600", color: "primary.400" }}
      onClick={() => loginWithRedirect()}
    >
      Logar com twitch
    </Button>
  );
};

export default LoginButton;
