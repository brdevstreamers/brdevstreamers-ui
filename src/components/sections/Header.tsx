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

export default function Header() {
  return (
    <Flex p={4} borderBottomColor={"whiteAlpha.100"} borderBottomWidth={1}>
      <HStack>
        <Image src="../../logo.svg" alt="Br Dev Streamers" height={50} />
        <Box textAlign={"center"}>
          <Text className="logo-title">BR Dev Streamers</Text>
          <Text mt={-2} className="logo-subtitle">
            Unindo a comunidade de Live Coding
          </Text>
        </Box>
      </HStack>
      <Spacer />
      <HStack gap={4}>
        <Link
          as={NavLink}
          to={"/"}
          color={"primary.500"}
          _hover={{ textDecoration: "underline" }}
        >
          Assistir
        </Link>
      </HStack>
      <Spacer />
      <HStack gap={4}>
        <Link
          as={NavLink}
          to={"/sobre"}
          color={"primary.500"}
          _hover={{ textDecoration: "underline" }}
        >
          GitHub
        </Link>
        <Link
          as={NavLink}
          to={"/sobre"}
          color={"primary.500"}
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
