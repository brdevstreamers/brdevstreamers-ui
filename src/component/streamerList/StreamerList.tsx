import { Box, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { StreamerModel } from "../../model/StreamerModel";

import StreamerCard from "../streamerCard/StreamerCard";

export default function StreamerList() {
  const [streamers, setStreamers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [isReloading, setReloading] = React.useState(false);

  React.useEffect(() => {
    const reloadStreams = async () => {
      setReloading(true);
      fetchUsers();
      setReloading(false);
    };
    
    fetchUsers();
    
    const intervalId = setInterval(() => {
      reloadStreams();
    }, 120000);

    return () => clearInterval(intervalId);
  }, []);

  


  const fetchUsers = async () => {
    setLoading(true);
    const streamersList = await axios.get(process.env.REACT_APP_API_URL || "");
    setStreamers(streamersList.data);
    setLoading(false);
  };

  return (
    <>
      {loading && !isReloading && (
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
        <SimpleGrid minChildWidth="300px" columns={3} spacing={5}>
          {streamers.map((streamer: StreamerModel) => {
            return (
              <StreamerCard
                key={streamer.id}
                streamer={streamer}
              ></StreamerCard>
            );
          })}
        </SimpleGrid>
      )}
    </>
  );
}
