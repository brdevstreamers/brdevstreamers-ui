import { Center, Container, Link as ExtLink, Text, Wrap, WrapItem } from "@chakra-ui/react";
import Link from 'next/link'

export default function Footer() {
  return (
    <>
      <Container maxW='80vw' className="footer" mt="10" position="absolute" left="50%" 
        transform="translateX(-50%)" bottom="0">
        <Center>
          <Wrap justify='center'>
            <WrapItem>
              <Text color="primary.500" fontWeight="semibold">
                <Link href="/"><a>Home</a></Link>
              </Text>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                |
              </Text>
            </WrapItem>
            <WrapItem>
              <Text color="primary.500" fontWeight="semibold">
                <Link href="/sobre"><a>Sobre</a></Link>
              </Text>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                |
              </Text>
            </WrapItem>
            <WrapItem>
              <Text color="primary.500" fontWeight="semibold">
                <Link href="/stats"><a>Estatísticas</a></Link>
              </Text>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                |
              </Text>
            </WrapItem>
            <WrapItem>
              <Text color="primary.500" fontWeight="semibold">
                <Link href="/agradecimentos"><a>Agradecimentos</a></Link>
              </Text>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                |
              </Text>
            </WrapItem>
            <WrapItem>
              <Text color="primary.400" ml="2" fontWeight="semibold">
                feito com ♥ por
              </Text>
              <ExtLink
                ml="2"
                fontWeight="semibold"
                isExternal={true}
                href="https://twitch.tv/flaviojmendes"
                color="primary.500"
              >
                flaviojmendes
              </ExtLink>
            </WrapItem>
          </Wrap>
        </Center>
      </Container>
    </>
  );
}
