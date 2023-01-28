import { useCallback, useEffect, useMemo, useState } from "react";
import { FiGrid, FiCoffee } from "react-icons/fi";
import { chakra } from "@chakra-ui/react";

import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
  Spinner,
  Stack,
  Tag as TagChakra,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";

import type { Channel, Tag } from "../types";

import { SkeletonListCard } from "../components/sections/SkeletonListCard";
import { SkeletonListTags } from "../components/sections/SkeletonListTags";
import Card from "../components/ui/Card";
import Mosaic from "../components/sections/Mosaic";
import { useAxios } from "../hooks/useAxios";
import { endpoints } from "../service/api";
import { useSearchParams } from "react-router-dom";
import { useErrorHandler } from "react-error-boundary";

export default function Home() {
  const REFRESH_TIME_IN_SECONDS = 120;
  const { apiGet } = useAxios();
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const [isLargerThan1000px] = useMediaQuery("(min-width: 1000px)");
  const handleError = useErrorHandler();

  const [isMosaicMode, setIsMosaicMode] = useState(false);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [vods, setVods] = useState<Channel[]>([]);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Array<Tag>>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [isFetching, setIsFetching] = useState<boolean>(true);

  const hasData = !!channels.length || !!tags.length || !!vods.length;
  const isLoading = isFetching && !hasData;
  const isRefetching = isLoading && hasData;

  const loadData = useCallback(async () => {
    try {
      setIsFetching(true);

      const [channelsList, tagsList, vodsList] = await Promise.all([
        apiGet<Channel[]>(endpoints.channels.url),
        apiGet<Tag[]>(endpoints.tags.url),
        apiGet<Channel[]>(endpoints.vods.url),
      ]);

      setChannels(channelsList);
      setTags(tagsList);
      setVods(vodsList);
    } catch (error) {
      handleError(error);
    } finally {
      setIsFetching(false);
    }
  }, [apiGet, handleError]);

  const handleShuffleClick = () => {
    const channel = channels[Math.floor(Math.random() * channels.length)];

    window.open(`https://www.twitch.tv/${channel.user_name}`, "_blank");
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
    const hasSelectedTag = selectedTags.some((t) => t.id === tag.id);
    const newSelectedTags = hasSelectedTag
      ? selectedTags.filter((t) => t.id !== tag.id)
      : [...selectedTags, tag];
    const newSearchParams = newSelectedTags.map((t) => t.name).toString();

    setSearchParams(newSearchParams ? { tags: newSearchParams } : "");
    setSelectedTags(newSelectedTags);
  };

  useEffect(() => {
    loadData();

    const reloadInterval = setInterval(() => {
      loadData();
    }, REFRESH_TIME_IN_SECONDS * 1000);

    return () => clearInterval(reloadInterval);
  }, [loadData]);

  useEffect(() => {
    const tagNames = searchParams.get("tags");
    if (tagNames && tags?.length) {
      const tagsNamesArray = decodeURIComponent(tagNames).split(",");
      const newSelectedTags = tagsNamesArray.map((tag) =>
        tags.find((t) => t.name === tag),
      ) as Tag[];
      setSelectedTags(newSelectedTags);
    }
  }, [searchParams, tags]);

  const filterChannelsByTags = (channels: Channel[] | undefined, selectedTags: Tag[]) => {
    if (selectedTags.length === 0) {
      return channels;
    }
    const filteredChannels = channels?.filter((channel) => {
      return selectedTags.every((selectedTag) => channel.tags?.includes(selectedTag.id));
    });

    return filteredChannels ?? [];
  };

  const filteredChannels = useMemo(
    () => filterChannelsByTags(channels, selectedTags),
    [channels, selectedTags],
  );

  return (
    <>
      <Flex mt={8} mb={4} gap={2} alignItems="center" wrap="wrap">
        <Box>
          <Heading display="flex" flexDirection="row" alignItems="center">
            Ao vivo
            {!isRefetching && (
              <chakra.span ml="2" mt="1">
                <svg width="24px" height="24px">
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
              </chakra.span>
            )}
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
                data-test="simultaneous-button"
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
            {tags?.map((tag) => {
              const isTagSelected = selectedTags.some((t) => t.id === tag.id);
              return (
                <TagChakra
                  as="a"
                  href={`?tags=${encodeURIComponent(tag.name)}`}
                  flexShrink="0"
                  cursor="pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleTagClick(tag);
                  }}
                  key={tag.id}
                  m={1}
                  rounded={"sm"}
                  color={isTagSelected ? "gray.100" : "gray.300"}
                  bgColor={isTagSelected ? "#8B3DFF" : "gray.800"}
                  _hover={{
                    opacity: "0.5",
                  }}
                  data-test={
                    isTagSelected ? "tag-filter-item-selected" : "tag-filter-item-unselected"
                  }
                >
                  {tag.name}
                </TagChakra>
              );
            })}
          </>
        )}
      </Flex>
      {isLoading ? (
        <SkeletonListCard />
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {filteredChannels?.map((channel) => (
            <Card
              key={channel.id}
              channel={channel}
              isLive={true}
              isMosaicMode={isMosaicMode}
              handleChannelToMosaic={handleChannelToMosaic}
              data-test="card-online"
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
          {vods?.map((channel) => (
            <Card
              key={channel.id}
              channel={channel}
              isLive={false}
              isMosaicMode={false}
              data-test="card-vod"
            />
          ))}
        </SimpleGrid>
      )}

      {isMosaicMode && <Mosaic channels={selectedChannels} />}
    </>
  );
}
