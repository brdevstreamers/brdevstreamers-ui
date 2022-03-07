import {
  Box,
  Button,
  chakra,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

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
        <Link
          to={"/sobre"}
          color={"gray.100"}
          _hover={{ textDecoration: "underline" }}
        >
          GitHub
        </Link>
        <Link
          to={"/sobre"}
          color={"gray.100"}
          _hover={{ textDecoration: "underline" }}
        >
          Discord
        </Link>
        <Button
          bgColor={"primary.500"}
          borderRadius={"sm"}
          _hover={{ bgColor: "primary.600", color: "primary.400" }}
        >
          Logar com twitch
        </Button>
      </HStack>
    </Flex>
  );
}
