import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, chakra, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import LoginButton from "../../ui/LoginButton";
import { useAuth } from "../../../hooks/useAuth";

export default function Login() {
  const { authenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    document.location.href = "/";
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <>
      {!authenticated && <LoginButton />}
      {authenticated && (
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
