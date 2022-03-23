import { Center, VStack, Text, Button, Box } from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";

const ErrorFallback = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <Center h="full">
      <VStack gap="2">
        <Box textAlign="center">
          <Text fontSize="2xl" color="white" fontWeight="semibold">
            Oops! Algo de errado não está certo
          </Text>
          <Text fontSize="lg" color="white">
            Não conseguimos carregar o que você estava procurando 😔
          </Text>
        </Box>
        <Button onClick={resetErrorBoundary}>Tente novamente</Button>
      </VStack>
    </Center>
  );
};

export default ErrorFallback;
