import { Box, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import { useAxios } from "../../hooks/useAxios";
import React from "react";
import { StreamerModel } from "../../model/StreamerModel";
import StreamerCard from "../streamerCard/StreamerCard";
import { endpoints } from "../../service/api";
import TagFilter from "../tagFilter/TagFilter";
import { setFlagsFromString } from "v8";
interface Props {
  setReloading(isReloading: boolean): void;
  setStreamingUrls(streamingUrls: string[]): void;
  setMosaicModeOn(mosaicModeOn: boolean): void;
  setSelectedStreams(selectedStreams: string[]): void;
  mosaicModeOn: boolean;
}

export default function StreamerList(props: Props) {
  const { apiGet } = useAxios();
  const [streamers, setStreamers] = React.useState<StreamerModel[]>([]);
  const [filteredStreamers, setFilteredStreamers] = React.useState<
    StreamerModel[]
  >([]);

  const [loading, setLoading] = React.useState(false);
  const [selectedStreams, setSelectedStreams] = React.useState<string[]>([]);

  React.useEffect(() => {
    const extractUrls = (streamers: StreamerModel[]) => {
      return streamers.map((streamer) => streamer.user_name);
    };

    const fetchUsers = async () => {
      const streamersList = await apiGet<StreamerModel[]>(
        endpoints.streams.url,
      );
      setStreamers(streamersList);
      setFilteredStreamers(streamersList);
      props.setStreamingUrls(extractUrls(streamersList));
    };

    const reloadStreams = async () => {
      props.setReloading(true);
      await fetchUsers();
      props.setReloading(false);
    };

    const loadStreams = async () => {
      setLoading(true);
      await fetchUsers();
      setLoading(false);
    };

    loadStreams();

    const intervalId = setInterval(() => {
      reloadStreams();
    }, 120000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    props.setSelectedStreams(selectedStreams);
  }, [selectedStreams]);

  const handleMosaicSelection = (user_name: string) => {
    if (selectedStreams.includes(user_name)) {
      setSelectedStreams(
        selectedStreams.filter((streamer) => streamer !== user_name),
      );
    } else {
      setSelectedStreams([...selectedStreams, user_name]);
    }
  };

  const filterByTags = (tags: string[]) => {
    (async () => {
      if (tags.length > 0) {
        const filteredStreams = await streamers.filter((streamer) => {
          return tags.every((tag) => streamer.tags.includes(tag));
        });
        setFilteredStreamers(filteredStreams);
      } 
      else {
        setFilteredStreamers(streamers);

      }
    })();
  };

  return (
    <>
      {loading && (
        <SimpleGrid minChildWidth="300px" columns={3} spacing={5}>
          <Box
            maxW="md"
            minH="md"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            overflowY="clip"
            textOverflow="ellipsis"
            background="white"
          >
            <Stack>
              <Skeleton height="140px" />
              <Skeleton height="30px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          </Box>
          <Box
            maxW="md"
            minH="md"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            overflowY="clip"
            textOverflow="ellipsis"
            background="white"
          >
            <Stack>
              <Skeleton height="140px" />
              <Skeleton height="30px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          </Box>
          <Box
            maxW="md"
            minH="md"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            overflowY="clip"
            textOverflow="ellipsis"
            background="white"
          >
            <Stack>
              <Skeleton height="140px" />
              <Skeleton height="30px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </Stack>
          </Box>
        </SimpleGrid>
      )}
      {!loading && (
        <>
          <TagFilter filterByTags={filterByTags}></TagFilter>
          <SimpleGrid minChildWidth="300px" columns={3} spacing={5}>
            {filteredStreamers.map((streamer: StreamerModel) => {
              return (
                <StreamerCard
                  key={streamer.id}
                  streamer={streamer}
                  mosaicModeOn={props.mosaicModeOn}
                  setStreamSelected={handleMosaicSelection}
                ></StreamerCard>
              );
            })}
          </SimpleGrid>
        </>
      )}
    </>
  );
}
