import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Center,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

export default function Login() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
      <Button
        colorScheme="purple"
        float="right"
        mr="5"
        mt="5"
        variant="solid"
        onClick={() => loginWithRedirect()}
      >
        Login
      </Button>
    );
  };

  const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
      <Button
        colorScheme="purple"
        float="right"
        mr="5"
        mt="5"
        variant="solid"
        onClick={() => logout({ returnTo: 'http://localhost:3000/' })}
      >
        Logout
      </Button>
    );
  };

  return (
    <>
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && (
        <>
          <Popover placement="left" closeOnBlur={true}>
            <PopoverTrigger>
              <Avatar
                position="absolute"
                right="40px"
                top="40px"
                name={user?.name}
                src={user?.picture}
              />
            </PopoverTrigger>
            <PopoverContent color="white" bg="#33374D" borderColor="white" p='5' mt='5'>
              <Center>
                <Text color="primary.500" fontSize="lg" fontWeight="semibold">
                  {user?.nickname}
                </Text>
              </Center>
              <Center>
                <LogoutButton />
              </Center>
            </PopoverContent>
          </Popover>
        </>
      )}
    </>
  );
}
