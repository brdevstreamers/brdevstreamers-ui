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
      <HStack>
        <Box>
          <Image rounded={"full"} boxSize={"xs"} src={user?.picture} />
        </Box>
        <VStack>
          <FormControl>
            <FormLabel htmlFor="email">Bio</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">GitHub</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">LinkedIn</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Twitter</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Discord</FormLabel>
            <Input id="email" type="email" />
          </FormControl>
        </VStack>
      </HStack>
    </LandingLayout>
  );
}
