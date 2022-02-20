import {
  Center,
  chakra,
  Container,
  Divider,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";

export default function AboutPage() {
  return (
    <>
      <Container maxW="container.lg" mb='10'>
        <Center>
          <Image
            className="logo"
            src="/logo.svg"
            alt="Br Dev Streamers"
          ></Image>
        </Center>
        <Center>
          <h1>Sobre</h1>
        </Center>
        <chakra.h2 mt="3" lineHeight="8">
          O que é?
        </chakra.h2>
        <Text color="primary.400" fontWeight="semibold" fontSize="lg">
          O Br Dev Streamers surgiu com a ideia de agregar todas as pessoas que
          fazem live coding em português na Twitch.
        </Text>
        <chakra.h2 mt="10" lineHeight="8">
          Como Participar?
        </chakra.h2>
        <Text color="primary.400" fontWeight="semibold" fontSize="lg">
          Basta começar uma stream dentro da categoria de "Desenvolvimento de
          Jogos e Aplicativos" com a língua em português e você aparecerá na
          lista.
        </Text>
        <chakra.h2 mt="10" lineHeight="8">
          É verdade que este é um projeto open source?
        </chakra.h2>
        <Text color="primary.400" fontWeight="semibold" fontSize="lg">
          Sim, o projeto é open source e você pode acessá-lo (e abrir um PR) no Github em:
        </Text>
        <Text color="primary.400" fontWeight="semibold" fontSize="lg">
          Frontend: {' '}
          <Link color="primary.500"
            isExternal={true}
            href="https://github.com/flaviojmendes/brdevstreamers-ui"
          >
            https://github.com/flaviojmendes/brdevstreamers-ui
          </Link>
        </Text>
        <Text color="primary.400" fontWeight="semibold" fontSize="lg">
          Backend: {' '}
          <Link color="primary.500"
            isExternal={true}
            href="https://github.com/flaviojmendes/brdevstreamers"
          >
            https://github.com/flaviojmendes/brdevstreamers
          </Link>
        </Text>
      </Container>
    </>
  );
}
