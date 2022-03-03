import React from "react";
import useFetch from "react-fetch-hook";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import LandingLayout from "../components/layouts/LandingLayout";
import Card from "../components/ui/Card";
import { Stream } from "../types/stream.types";

export default function Home() {
  const streamers = useFetch<Stream[]>(
    "https://brstreamers.dev:8000/public/streams",
  );

  const vods = useFetch<Stream[]>("https://brstreamers.dev:8000/public/vods");

  return (
    <LandingLayout>
      <Box my={4}>
        <Heading>Ao vivo</Heading>
        <Text color={"gray.500"}>Prestigie quem está ao vivo!</Text>
      </Box>
      {streamers.isLoading ? (
        <Text color={"gray.200"}>Carregando..</Text>
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {streamers.data?.map((stream) => (
            <Card stream={stream} isLive={true} />
          ))}
        </SimpleGrid>
      )}

      <Box my={4}>
        <Heading>Transmissões passadas</Heading>
        <Text color={"gray.500"}>Veja o que deixaram gravado!</Text>
      </Box>
      {vods.isLoading ? (
        <Text color={"gray.200"}>Carregando..</Text>
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {vods.data?.map((stream) => (
            <Card stream={stream} isLive={false} />
          ))}
        </SimpleGrid>
      )}
    </LandingLayout>
  );
}
