import { Box, SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import { useAxios } from "../../hooks/useAxios";
import React from "react";
import { VodModel } from "../../model/VodModel";

import VodCard from "../vodCard/VodCard";
import { endpoints } from "../../service/api";

export default function VodList() {
  const { apiGet } = useAxios();
  const [vods, setVods] = React.useState<VodModel[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const vodsList = await apiGet<VodModel[]>(endpoints.vods.url);
    setVods(vodsList);
    setLoading(false);
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
        <SimpleGrid minChildWidth="300px" columns={3} spacing={5}>
          {vods.map((streamer: VodModel) => {
            return <VodCard key={streamer.id} vod={streamer}></VodCard>;
          })}
        </SimpleGrid>
      )}
    </>
  );
}
