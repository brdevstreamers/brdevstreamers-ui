import { Center, Container, Link, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { Link as RouteLink } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <Container maxW='80vw' className="footer" mt="10" position="absolute" left="50%" 
        transform="translateX(-50%)" bottom="0">
        <Center>
          <Wrap justify='center'>
            <WrapItem>
              <Text color="primary.500" fontWeight="semibold">
                <RouteLink to="/">Home</RouteLink>
              </Text>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                |
              </Text>
            </WrapItem>
            <WrapItem>
              <Text color="primary.500" fontWeight="semibold">
                <RouteLink to="/sobre">Sobre</RouteLink>
              </Text>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                |
              </Text>
            </WrapItem>
            <WrapItem>
              <Text color="primary.500" fontWeight="semibold">
                <RouteLink to="/stats">Estatísticas</RouteLink>
              </Text>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                |
              </Text>
            </WrapItem>
            <WrapItem>
              <Text color="primary.500" fontWeight="semibold">
                <RouteLink to="/agradecimentos">Agradecimentos</RouteLink>
              </Text>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                |
              </Text>
            </WrapItem>
            <WrapItem>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                feito com ♥ por
              </Text>
              <Link
                ml="2"
                fontWeight="semibold"
                isExternal={true}
                href="https://twitch.tv/flaviojmendes"
                color="primary.500"
              >
                flaviojmendes
              </Link>
            </WrapItem>
          </Wrap>
        </Center>
      </Container>
    </>
  );
}
