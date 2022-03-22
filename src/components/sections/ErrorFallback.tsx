import { Center, VStack, Text } from "@chakra-ui/react";

const ErrorFallback = () => {
  return (
    <Center h="full">
      <VStack>
        <Text fontSize="2xl" color="white" fontWeight="semibold">
          Oops! Algo de errado não está certo
        </Text>
        <Text fontSize="lg" color="white">
          Não conseguimos carregar o que você estava procurando 😔
        </Text>
      </VStack>
    </Center>
  );
};

export default ErrorFallback;
