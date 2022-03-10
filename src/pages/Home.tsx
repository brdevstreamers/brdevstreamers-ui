import { useCallback, useEffect, useState } from "react";
import { FiGrid, FiCoffee } from "react-icons/fi";
import { chakra } from '@chakra-ui/react'

import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  HStack,
  Tag as TagChakra,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";

import type { Channel, Tag } from "../types";

import LandingLayout from "../components/layouts/LandingLayout";
import { SkeletonListCard } from "../components/sections/SkeletonListCard";
import { SkeletonListTags } from "../components/sections/SkeletonListTags";
import Card from "../components/ui/Card";
import Mosaic from "../components/sections/Mosaic";
import { useAxios } from "../hooks/useAxios";
import { endpoints } from "../service/api";

export default function Home() {
  const REFRESH_TIME_IN_SECONDS = 120;
  const { apiGet } = useAxios();
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const [isLargerThan1000px] = useMediaQuery("(min-width: 1000px)");

  const [isMosaicMode, setIsMosaicMode] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [vods, setVods] = useState<Channel[]>([]);
  const [filteredChannels, setFilteredChannels] = useState<Channel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefetching, setIsReFetching] = useState<boolean>(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);

  const loadData = useCallback(async () => {
    setIsLoading(true);

    const channelsList = await apiGet<Channel[]>(endpoints.channels.url);
    const tagsList = await apiGet<Tag[]>(endpoints.tags.url);
    const vodsList = await apiGet<Channel[]>(endpoints.vods.url);

    setChannels(channelsList);
    setTags(tagsList);
    setVods(vodsList);

    setIsLoading(false);
  }, [apiGet]);

  const refetchData = useCallback(async () => {
    setIsReFetching(true);

    const channelsList = await apiGet<Channel[]>(endpoints.channels.url);
    const tagsList = await apiGet<Tag[]>(endpoints.tags.url);
    const vodsList = await apiGet<Channel[]>(endpoints.vods.url);

    setChannels(channelsList);
    setTags(tagsList);
    setVods(vodsList);

    setIsReFetching(false);
  }, [apiGet]);

  const handleShuffleClick = () => {
    const channelNames = channels.map((channel) => channel.user_name);
    const channelName = channelNames[Math.floor(Math.random() * channelNames.length)];

    window.open(`https://www.twitch.tv/${channelName}`, "_blank");
  };

  const handleChannelToMosaic = (channelName: string) => {
    const channel = selectedChannels.find((channel) => channel === channelName);
    if (channel) {
      setSelectedChannels(selectedChannels.filter((item) => item !== channel));
    } else {
      setSelectedChannels([...selectedChannels, channelName]);
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
        const filteredChannels = channels.filter((channel) => {
          return tags.every((tag) => channel.tags?.includes(tag));
        });
        setFilteredChannels(filteredChannels ?? []);
      } else {
        setFilteredChannels(channels);
      }
    },
    [channels],
  );

  useEffect(() => {
    loadData();

    const reloadInterval = setInterval(() => {
      refetchData();
    }, REFRESH_TIME_IN_SECONDS * 1000);

    return () => clearInterval(reloadInterval);
  }, [loadData, refetchData]);

  useEffect(() => {
    filterByTags(selectedTags);
  }, [selectedTags, filterByTags]);

  return (
    <LandingLayout>
      <Flex mt={8} mb={4} gap={2} alignItems="center" wrap="wrap">
        <Box>
          <Heading display="flex" flexDirection="row" alignItems="center">
            Ao vivo
            {!isRefetching && <chakra.span ml='2' mt='1'><svg width="24px" height="24px">
              <circle fill="#ff0000" stroke="none" cx="50%" cy="50%" r="10">
                <animate
                  attributeName="opacity"
                  dur="3s"
                  values="0;0.6;0"
                  repeatCount="indefinite"
                  begin="0.1"
                />
              </circle>
              <circle fill="#ff0000" stroke="none" cx="50%" cy="50%" r="6"></circle>
            </svg>
            </chakra.span>}
            {isRefetching && <Spinner ml={3} size="sm" />}
          </Heading>
          <Text color={"gray.400"}>Prestigie quem está ao vivo!</Text>
        </Box>

        <Spacer />

        <Box>
          <Stack direction="row" spacing={4}>
            {isLargerThan1000px && (
              <Button
                size={buttonSize}
                leftIcon={<FiGrid />}
                bgColor={isMosaicMode ? "#8B3DFF" : "gray.100"}
                color={isMosaicMode ? "gray.100" : "gray.800"}
                rounded={"sm"}
                _hover={{
                  bgColor: isMosaicMode ? "#8B3DFF" : "gray.200",
                  filter: "brightness(0.98)",
                }}
                onClick={() => setIsMosaicMode(!isMosaicMode)}
              >
                Simultâneo
              </Button>
            )}
            <Button
              size={buttonSize}
              variant="solid"
              rounded={"sm"}
              leftIcon={<FiCoffee />}
              onClick={handleShuffleClick}
            >
              Estou com sorte
            </Button>
          </Stack>
        </Box>
      </Flex>

      <Flex
        mb={4}
        wrap={{ base: "nowrap", md: "wrap" }}
        overflow="auto"
        sx={{
          scrollbarWidth: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
          "-ms-scrollbar-track-color": {
            display: "none",
          },
        }}
      >
        {isLoading ? (
          <SkeletonListTags />
        ) : (
          <>
            {tags.map((tag) => (
              <TagChakra
                flexShrink="0"
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
          </>
        )}
      </Flex>
      {isLoading ? (
        <SkeletonListCard />
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {filteredChannels.map((channel) => (
            <Card
              key={channel.id}
              channel={channel}
              isLive={true}
              isMosaicMode={isMosaicMode}
              handleChannelToMosaic={handleChannelToMosaic}
            />
          ))}
        </SimpleGrid>
      )}

      <Box mt={16} mb={4}>
        <Heading>Transmissões passadas</Heading>
        <Text color={"gray.400"}>Veja o que deixaram gravado!</Text>
      </Box>
      {isLoading ? (
        <SkeletonListCard />
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {vods.map((channel) => (
            <Card key={channel.id} channel={channel} isLive={false} isMosaicMode={false} />
          ))}
        </SimpleGrid>
      )}

      {isMosaicMode && <Mosaic channels={selectedChannels} />}
    </LandingLayout>
  );
}
