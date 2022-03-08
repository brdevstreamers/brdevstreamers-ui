import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HStack,
  Link,
  Tag,
  TagRightIcon,
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

      <Accordion defaultIndex={[0, 1, 2]} allowMultiple>
        <AccordionItem
          border="none"
          bgColor="blackAlpha.300"
          color="gray.100"
          fontWeight="semibold"
          rounded="sm"
          mb={4}
        >
          <h2>
            <AccordionButton color="gray.100">
              <Box flex="1" textAlign="left">
                O que é?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4} bgColor="blackAlpha.400" rounded="sm">
            <Text>
              O Br Dev Streamers surgiu com a ideia de agregar todas as pessoas
              que fazem live coding em português na Twitch.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem
          border="none"
          bgColor="blackAlpha.300"
          color="gray.100"
          fontWeight="semibold"
          rounded="sm"
          mb={4}
        >
          <h2>
            <AccordionButton color="gray.100">
              <Box flex="1" textAlign="left">
                Como Participar?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4} bgColor="blackAlpha.400" rounded="sm">
            <Text>
              Basta começar uma stream dentro da categoria de "Software e
              Desenvolvimento de Jogos" com a língua em português e você
              aparecerá na lista.
            </Text>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem
          border="none"
          bgColor="blackAlpha.300"
          color="gray.100"
          fontWeight="semibold"
          rounded="sm"
          mb={4}
        >
          <h2>
            <AccordionButton color="gray.100">
              <Box flex="1" textAlign="left">
                É verdade que este é um projeto open source?
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>

          <AccordionPanel pb={4} bgColor="blackAlpha.400" rounded="sm">
            <Text>
              Sim, o projeto é open source e você pode acessá-lo (e abrir um PR)
              no GitHub em:
            </Text>

            <Box as="br" />

            <HStack>
              <Link
                href="https://github.com/Br-Dev-Streamers/brdevstreamers-ui"
                target={"_blank"}
              >
                <Tag rounded="sm" _hover={{ bgColor: "gray.200" }}>
                  Frontend
                  <TagRightIcon as={ExternalLinkIcon} />
                </Tag>
              </Link>

              <Link
                href="https://github.com/Br-Dev-Streamers/brdevstreamers"
                target={"_blank"}
              >
                <Tag rounded="sm" _hover={{ bgColor: "gray.200" }}>
                  Backend
                  <TagRightIcon as={ExternalLinkIcon} />
                </Tag>
              </Link>

              <Link
                href="https://github.com/Br-Dev-Streamers/brdevstreamers-bot"
                target={"_blank"}
              >
                <Tag rounded="sm" _hover={{ bgColor: "gray.200" }}>
                  Bot
                  <TagRightIcon as={ExternalLinkIcon} />
                </Tag>
              </Link>

              <Link
                href="https://github.com/Br-Dev-Streamers/brdevstreamers-docs"
                target={"_blank"}
              >
                <Tag rounded="sm" _hover={{ bgColor: "gray.200" }}>
                  Documentação
                  <TagRightIcon as={ExternalLinkIcon} />
                </Tag>
              </Link>
            </HStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </LandingLayout>
  );
}
