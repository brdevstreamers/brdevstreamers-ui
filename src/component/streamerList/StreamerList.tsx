import { Box, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { StreamerModel } from "../../model/StreamerModel";
import Mosaic from "../mosaic/Mosaic";
import StreamerCard from "../streamerCard/StreamerCard";

interface Props {
  setReloading(isReloading: boolean): void;
  setStreamingUrls(streamingUrls: string[]): void;
  setMosaicModeOn(mosaicModeOn: boolean): void;
  setSelectedStreams(selectedStreams: string[]): void;
  mosaicModeOn: boolean;
}

export default function StreamerList(props: Props) {
  const [streamers, setStreamers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedStreams, setSelectedStreams] = React.useState<string[]>([]);

  React.useEffect(() => {
    const extractUrls = (streamers: StreamerModel[]) => {
      return streamers.map((streamer) => streamer.user_name);
    };

    const fetchUsers = async () => {
      const streamersList = await axios.get(
        process.env.REACT_APP_API_URL || ""
      );
      setStreamers(streamersList.data);
      props.setStreamingUrls(extractUrls(streamersList.data));
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
        selectedStreams.filter((streamer) => streamer !== user_name)
      );
    } else {
      setSelectedStreams([...selectedStreams, user_name]);
    }
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
        <Mosaic mosaicModeOn={props.mosaicModeOn} user_names={selectedStreams}/>
          <SimpleGrid minChildWidth="300px" columns={3} spacing={5}>
            {streamers.map((streamer: StreamerModel) => {
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
