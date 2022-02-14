import { Box, Center, Flex, SimpleGrid, Skeleton, Spinner, Stack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { StreamerModel } from "./model/StreamerModel";

import StreamerCard from "./StreamerCard";

export default function StreamerList() {
  const [streamers, setStreamers] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true)
    axios
      .get(process.env.REACT_APP_API_URL || "")
      .then((streamersList) => {
        setStreamers(streamersList.data)
        setLoading(false)
      });
  };

  return (
    <>
      {loading && 
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
            <Skeleton height='140px' />
            <Skeleton height='30px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
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
            <Skeleton height='140px' />
            <Skeleton height='30px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
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
            <Skeleton height='140px' />
            <Skeleton height='30px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
            <Skeleton height='20px' />
          </Stack>
        </Box>
      </SimpleGrid>
      // <Center><Spinner color='primary.700' mt='20' size='xl' thickness="5px" speed='0.65s'/></Center>
      }
      {!loading && <SimpleGrid minChildWidth="300px" columns={3} spacing={5}>
        {streamers.map((streamer: StreamerModel) => {
          return <StreamerCard streamer={streamer}></StreamerCard>;
        })}
      </SimpleGrid>}
    </>
  );
}
