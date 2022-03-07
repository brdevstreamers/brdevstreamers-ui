import { useCallback, useEffect, useState } from "react";
import useFetch from "react-fetch-hook";
import {
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Tag as TagChakra,
  Text,
} from "@chakra-ui/react";
import LandingLayout from "../components/layouts/LandingLayout";
import Card from "../components/ui/Card";
import { Stream } from "../types/stream.types";
import { FiGrid, FiCoffee } from "react-icons/fi";
import { SkeletonListCard } from "../components/sections/SkeletonListCard";
import Mosaic from "../components/sections/Mosaic";
import { Tag } from "../types/tag.types";

export default function Home() {
  const [isMosaicMode, setIsMosaicMode] = useState(false);
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [filteredStreamers, setFilteredStreamers] = useState<Stream[]>([]);

  const tags = useFetch<Tag[]>("https://brstreamers.dev:8000/public/tags");
  const streamers = useFetch<Stream[]>(
    "https://brstreamers.dev:8000/public/streams",
  );
  const vods = useFetch<Stream[]>("https://brstreamers.dev:8000/public/vods");

  const handleStreamToMosaic = (channelName: string) => {
    const stream = selectedStreams.find((stream) => stream === channelName);
    if (stream) {
      setSelectedStreams(selectedStreams.filter((item) => item !== stream));
    } else {
      setSelectedStreams([...selectedStreams, channelName]);
    }
  };

  const handleTagClick = (tag: Tag) => {
    if (selectedTags.includes(tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  const filterByTags = useCallback(
    (tags: string[]) => {
      if (tags.length > 0) {
        const filteredStreams = streamers.data?.filter((streamer) => {
          return tags.every((tag) => streamer.tags?.includes(tag));
        });
        setFilteredStreamers(filteredStreams ?? []);
      } else {
        setFilteredStreamers(streamers.data ?? []);
      }
    },
    [streamers.data],
  );

  useEffect(() => {
    setFilteredStreamers(streamers.data ?? []);
  }, [streamers]);

  useEffect(() => {
    filterByTags(selectedTags);
  }, [selectedTags, filterByTags]);

  return (
    <LandingLayout>
      <HStack mt={8} mb={4}>
        <Box>
          <Heading>Ao vivo</Heading>
          <Text color={"gray.400"}>Prestigie quem está ao vivo!</Text>
        </Box>
        <Spacer />
        <Box>
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<FiGrid />}
              variant="solid"
              rounded={"sm"}
              onClick={() => setIsMosaicMode(!isMosaicMode)}
            >
              Simultaneo
            </Button>
            <Button leftIcon={<FiCoffee />} variant="solid" rounded={"sm"}>
              Estou com sorte
            </Button>
          </Stack>
        </Box>
      </HStack>
      <Box mb={4}>
        {tags.data?.map((tag) => (
          <TagChakra
            cursor="pointer"
            onClick={() => handleTagClick(tag)}
            key={tag.id}
            m={1}
            rounded={"sm"}
            color={selectedTags.includes(tag.id) ? "gray.100" : "gray.300"}
            bgColor={selectedTags.includes(tag.id) ? "#8B3DFF" : "gray.800"}
          >
            {tag.name}
          </TagChakra>
        ))}
      </Box>
      {streamers.isLoading ? (
        <SkeletonListCard />
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {filteredStreamers.map((stream) => (
            <Card
              key={stream.id}
              stream={stream}
              isLive={true}
              isMosaicMode={isMosaicMode}
              handleStreamToMosaic={handleStreamToMosaic}
            />
          ))}
        </SimpleGrid>
      )}

      <Box mt={16} mb={4}>
        <Heading>Transmissões passadas</Heading>
        <Text color={"gray.400"}>Veja o que deixaram gravado!</Text>
      </Box>
      {vods.isLoading ? (
        <SkeletonListCard />
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {vods.data?.map((stream) => (
            <Card
              key={stream.id}
              stream={stream}
              isLive={false}
              isMosaicMode={false}
            />
          ))}
        </SimpleGrid>
      )}

      {isMosaicMode && <Mosaic channels={selectedStreams} />}
    </LandingLayout>
  );
}
