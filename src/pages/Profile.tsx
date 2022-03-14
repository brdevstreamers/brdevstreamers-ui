import { useAuth0 } from "@auth0/auth0-react";
import { Box, Heading, HStack, Text, Image } from "@chakra-ui/react";
import LandingLayout from "../components/layouts/LandingLayout";
import { TwitchUser } from "../types/twitch-user.types";

export default function Profile() {
  const { user, isLoading } = useAuth0<TwitchUser>();
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
        <Box>Form</Box>
      </HStack>
    </LandingLayout>
  );
}
