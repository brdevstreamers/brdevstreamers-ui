import {
  Box,
  chakra,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Login from "../../component/login/Login";

const Link = chakra(NavLink);

const links = [
  {
    id: 1,
    to: "/",
    label: "Assistir",
  },
  {
    id: 2,
    to: "/sobre",
    label: "Sobre",
  },
  {
    id: 3,
    to: "/stats",
    label: "Estatísticas",
  },
  {
    id: 4,
    to: "/agradecimentos",
    label: "Agradecimentos",
  },
];

export default function Header() {
  return (
    <Flex p={4} borderBottomColor={"whiteAlpha.100"} borderBottomWidth={1}>
      <Link to="/">
        <HStack>
          <Image src="/logo.svg" alt="Br Dev Streamers" height={50} />
          <Box textAlign={"center"}>
            <Text className="logo-title">BR Dev Streamers</Text>
            <Text mt={-2} className="logo-subtitle">
              Unindo a comunidade de Live Coding
            </Text>
          </Box>
        </HStack>
      </Link>
      <Spacer />
      <HStack gap={4}>
        {links.map((link) => (
          <Link
            to={link.to}
            key={link.id}
            color={"gray.100"}
            _activeLink={{
              color: "primary.500",
            }}
            _hover={{ textDecoration: "underline" }}
          >
            {link.label}
          </Link>
        ))}
      </HStack>
      <Spacer />
      <HStack gap={4}>
        <ChakraLink
          isExternal={true}
          href={"https://github.com/Br-Dev-Streamers"}
          color={"gray.100"}
          _hover={{ textDecoration: "underline" }}
        >
          GitHub
        </ChakraLink>
        <ChakraLink
          isExternal={true}
          href={"https://discord.gg/collabcode"}
          color={"gray.100"}
          _hover={{ textDecoration: "underline" }}
        >
          Discord
        </ChakraLink>
        {/* <Button
          bgColor={"primary.500"}
          borderRadius={"sm"}
          _hover={{ bgColor: "primary.600", color: "primary.400" }}
        >
          Logar com twitch
        </Button> */}
        <Login />
      </HStack>
    </Flex>
  );
}
