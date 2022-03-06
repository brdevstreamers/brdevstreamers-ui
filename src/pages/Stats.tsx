import { Box, Heading, Text } from "@chakra-ui/react";
import LandingLayout from "../components/layouts/LandingLayout";

export default function Supporters() {
  return (
    <LandingLayout>
      <Box mt={8} mb={4}>
        <Heading>Estatísticas</Heading>
        <Text color={"gray.500"}>Saiba mais sobre o projeto!</Text>
      </Box>
    </LandingLayout>
  );
}
