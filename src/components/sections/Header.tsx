import { useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  chakra,
  Flex,
  HStack,
  Image,
  Spacer,
  Text,
  Button,
  List,
  ListItem,
  Link as ChakraLink,
  useMediaQuery,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  VStack,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

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
//   {
//     id: 3,
//     to: "/estatisticas",
//     label: "Estatísticas",
//   },
//   {
//     id: 4,
//     to: "/agradecimentos",
//     label: "Agradecimentos",
//   },
];

export default function Header() {
  const [isLargerThanLg] = useMediaQuery("(min-width: 62em)");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonRef = useRef(null);

  return (
    <>
      <Flex p={4} borderBottomColor={"whiteAlpha.100"} borderBottomWidth={1} alignItems="center" as="header">
        <Link to="/">
          <HStack>
            <Image src="/logo.svg" alt="Br Dev Streamers" height={50} width={50} />
            <Box textAlign={"center"}>
              <Text className="logo-title">BR Dev Streamers</Text>
              <Text mt={-2} className="logo-subtitle">
                Unindo a comunidade de Live Coding
              </Text>
            </Box>
          </HStack>
        </Link>
        <Spacer />
        {isLargerThanLg && (
          <>
            <HStack gap={4} as="nav">
              <List display="flex" gap={4}>
                {links.map((link) => (
                  <ListItem key={link.id}>
                    <Link
                      to={link.to}
                    
                      color={"gray.100"}
                      _activeLink={{
                        color: "primary.500",
                      }}
                      _hover={{ textDecoration: "underline" }}
                      data-test="header-link"
                    >
                      {link.label}
                    </Link>
                  </ListItem>
                ))}
              </List>
            </HStack>
            <Spacer />
            <HStack gap={4} as="nav">
            <List display="flex" gap={4}>
              <ListItem>
                <ChakraLink
                  isExternal={true}
                  href={"https://github.com/brdevstreamers"}
                  color={"gray.100"}
                  _hover={{ textDecoration: "underline" }}
                  data-test="header-link"
                >
                  GitHub
                </ChakraLink>
              </ListItem>
              <ListItem>
                <ChakraLink
                  isExternal={true}
                  href={"https://discord.gg/collabcode"}
                  color={"gray.100"}
                  _hover={{ textDecoration: "underline" }}
                  data-test="header-link"
                >
                  Discord
                </ChakraLink>
              </ListItem>
              </List>
              {/* <Button
          bgColor={"primary.500"}
          borderRadius={"sm"}
          _hover={{ bgColor: "primary.600", color: "primary.400" }}
        >
          Logar com twitch
        </Button> */}
            </HStack>
          </>
        )}

        {!isLargerThanLg && (
          <Button
            ref={buttonRef}
            size="xs"
            rounded="sm"
            bgColor="blackAlpha.500"
            color="gray.100"
            _hover={{
              filter: "brightness(0.9)",
            }}
            leftIcon={<HamburgerIcon />}
            onClick={onOpen}
          >
            Menu
          </Button>
        )}
      </Flex>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={buttonRef}>
        <DrawerOverlay />

        <DrawerContent bgColor="secondary.600" color="gray.100" px={4} pt={16}>
          <DrawerCloseButton aria-label="Fechar" />

          <VStack alignItems="start">
            <List display="flex" flexDirection="column" gap={4} width="100%">
              {links.map((link) => (
                <ListItem key={link.id} display="flex">
                  <Link
                    to={link.to}
                    w="full"
                    p={2}
                    rounded="sm"
                    color={"gray.100"}
                    _activeLink={{
                      color: "primary.500",
                      bgColor: "blackAlpha.500",
                    }}
                    _hover={{ bgColor: "blackAlpha.500" }}
                  >
                    {link.label}
                  </Link>
                </ListItem>
              ))}

              <ListItem display="flex"> 
                <ChakraLink
                  isExternal={true}
                  href={"https://github.com/brdevstreamers"}
                  color={"gray.100"}
                  w="full"
                  p={2}
                  rounded="sm"
                  _hover={{ bgColor: "blackAlpha.500" }}
                >
                  GitHub
                </ChakraLink>
              </ListItem>
              <ListItem display="flex">
                <ChakraLink
                  isExternal={true}
                  href={"https://discord.gg/collabcode"}
                  p={2}
                  w="full"
                  rounded="sm"
                  color={"gray.100"}
                  _hover={{ bgColor: "blackAlpha.500" }}
                >
                  Discord
                </ChakraLink>
              </ListItem>
            </List>
          </VStack>
        </DrawerContent>
      </Drawer>
    </>
  );
}
