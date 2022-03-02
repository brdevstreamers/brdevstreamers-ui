import { Box, chakra, Flex, HStack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const Link = chakra(NavLink);

export default function Footer() {
  return (
    <Box>
      <Box maxW={"container.xl"} m={"0 auto"}>
        <HStack
          p={4}
          m={4}
          borderTopColor={"whiteAlpha.100"}
          borderTopWidth={1}
          align={"center"}
          justify={"center"}
          gap={4}
        >
          <Link
            as={NavLink}
            to={"/sobre"}
            color={"primary.500"}
            _hover={{ textDecoration: "underline" }}
          >
            Sobre
          </Link>
          <Link
            as={NavLink}
            to="/stats"
            color={"primary.500"}
            _hover={{ textDecoration: "underline" }}
          >
            Estatísticas
          </Link>
          <Link
            as={NavLink}
            to="/agradecimentos"
            color={"primary.500"}
            _hover={{ textDecoration: "underline" }}
          >
            Agradecimentos
          </Link>
          <Text color="primary.400">
            Feito com ♥ por{" "}
            <Link
              as={NavLink}
              to="https://twitch.tv/flaviojmendes"
              target={"_blank"}
              color={"primary.500"}
              _hover={{ textDecoration: "underline" }}
            >
              flaviojmendes
            </Link>
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}
