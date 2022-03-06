import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import LandingLayout from "../components/layouts/LandingLayout";

export default function About() {
  return (
    <LandingLayout>
      <Box mt={8} mb={4}>
        <Heading>Sobre</Heading>
        <Text color={"gray.500"}>Saiba mais sobre o projeto!</Text>
      </Box>
      <Accordion>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading>O que é?</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text color={"gray.500"}>
              O Br Dev Streamers surgiu com a ideia de agregar todas as pessoas
              que fazem live coding em português na Twitch.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading>Como Participar?</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text color={"gray.500"}>
              Basta começar uma stream dentro da categoria de "Software e
              Desenvolvimento de Jogos" com a língua em português e você
              aparecerá na lista.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading>É verdade que este é um projeto open source?</Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Text color={"gray.500"}>
              Sim, o projeto é open source e você pode acessá-lo (e abrir um PR)
              no Github em:
            </Text>
            <Text color={"gray.500"}>
              <Link
                href="https://github.com/Br-Dev-Streamers/brdevstreamers-ui"
                target={"_blank"}
              >
                Frontend: https://github.com/flaviojmendes/brdevstreamers-ui
              </Link>
            </Text>
            <Text color={"gray.500"}>
              <Link
                href="https://github.com/Br-Dev-Streamers/brdevstreamers"
                target={"_blank"}
              >
                Backend: https://github.com/flaviojmendes/brdevstreamers
              </Link>
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </LandingLayout>
  );
}
