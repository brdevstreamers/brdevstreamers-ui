import { useAuth0 } from "@auth0/auth0-react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  chakra,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const cookies = new Cookies();

export default function Login() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { logout } = useAuth0();

  useEffect(() => {
    (async () => {
      const token = await getAccessTokenSilently({
        audience: "BrStreamersApi",
      });

      cookies.set("api_token", `Bearer ${token}`);
      
    })();
  }, [getAccessTokenSilently]);

  const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
      <Button
        colorScheme="purple"
        float="right"
        mr="5"
        mt="5"
        variant="solid"
        onClick={() => {
          loginWithRedirect();
        }}
      >
        Login
      </Button>
    );
  };

  const handleLogoutClick = () => {
    logout({ returnTo: process.env.REACT_APP_REDIRECT_URL });
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && (
        <>
          <Menu>
            <MenuButton
              colorScheme="purple"
              as={Button}
              rightIcon={<ChevronDownIcon />}
              position="absolute"
              right="40px"
              top="40px"
            >
              <chakra.span className="login-label">
                {user?.nickname}
              </chakra.span>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </>
      )}
    </>
  );
}
