import {
  Box,
  Heading,
  HStack,
  Text,
  Image,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  VStack,
  Avatar,
  Flex,
  Button,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import LandingLayout from "../components/layouts/LandingLayout";
import { useAuth } from "../hooks/useAuth";

export default function Profile() {
  const { user, authenticated } = useAuth();

  useEffect(() => {
    if (!authenticated) {
      document.location.href = "/";
    }
  });
  return (
    <LandingLayout>
      <Box mt={8} mb={4}>
        <Heading>Perfil</Heading>
        <Text color={"gray.500"}>Aqui estão suas informações pessoais</Text>
      </Box>

      <Flex
        w={"full"}
        gap={6}
        p={6}
        bgColor={"whiteAlpha.100"}
        borderWidth="1px"
        borderColor={"whiteAlpha.100"}
        borderRadius={"sm"}
        overflow="hidden"
        boxShadow={["base"]}
        color={"gray.500"}
      >
        <Box>
          <Avatar size="2xl" name="Segun Adebayo" src={user?.picture} />
        </Box>
        <Box flex={1}>
          <FormControl>
            <FormLabel htmlFor="email">Bio</FormLabel>
            <Textarea
              borderRadius={"sm"}
              borderColor={"whiteAlpha.100"}
              _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
              _hover={{ borderColor: "whiteAlpha.400" }}
            />
          </FormControl>
          <HStack gap={4} mt={4}>
            <FormControl>
              <FormLabel htmlFor="email">GitHub</FormLabel>
              <Input
                id="email"
                type="email"
                borderRadius={"sm"}
                borderColor={"whiteAlpha.100"}
                _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
                _hover={{ borderColor: "whiteAlpha.400" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">LinkedIn</FormLabel>
              <Input
                id="email"
                type="email"
                borderRadius={"sm"}
                borderColor={"whiteAlpha.100"}
                _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
                _hover={{ borderColor: "whiteAlpha.400" }}
              />
            </FormControl>
          </HStack>
          <HStack gap={4} mt={4}>
            <FormControl>
              <FormLabel htmlFor="email">Twitter</FormLabel>
              <Input
                id="email"
                type="email"
                borderRadius={"sm"}
                borderColor={"whiteAlpha.100"}
                _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
                _hover={{ borderColor: "whiteAlpha.400" }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Discord</FormLabel>
              <Input
                id="email"
                type="email"
                borderRadius={"sm"}
                borderColor={"whiteAlpha.100"}
                _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
                _hover={{ borderColor: "whiteAlpha.400" }}
              />
            </FormControl>
          </HStack>
          <Box mt={4} textAlign={"end"}>
            <Button
              bgColor={"primary.500"}
              color={"white"}
              borderRadius={"sm"}
              _hover={{ bgColor: "primary.600", color: "primary.400" }}
            >
              Atualizar perfil
            </Button>
          </Box>
        </Box>
      </Flex>
    </LandingLayout>
  );
}
