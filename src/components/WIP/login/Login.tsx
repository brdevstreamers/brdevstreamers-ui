import { useAuth0 } from "@auth0/auth0-react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, chakra, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import LoginButton from "../../ui/LoginButton";
import { useEffect } from "react";

export default function Login() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const { logout } = useAuth0();

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    logout({ returnTo: process.env.REACT_APP_REDIRECT_URL });
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const getToken = async () => {
    if (!isLoading && isAuthenticated) {
      const token = await getAccessTokenSilently({
        audience: "BrStreamersApi",
      });

      localStorage.setItem("token", token);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <>
      {!isAuthenticated && <LoginButton />}
      {isAuthenticated && (
        <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon />}
            bgColor={"primary.500"}
            borderRadius={"sm"}
            _hover={{ bgColor: "primary.600", color: "primary.400" }}
          >
            <chakra.span className="login-label">{user?.nickname}</chakra.span>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </MenuList>
        </Menu>
      )}
    </>
  );
}
