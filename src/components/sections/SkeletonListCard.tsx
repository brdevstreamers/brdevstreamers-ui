import { Box, SimpleGrid, Skeleton, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react";

export const SkeletonListCard = () => {
  return (
  <SimpleGrid minChildWidth="300px" columns={{sm: 2, md: 3, lg: 4}} gap={4}>
      {[...new Array(8)].map(() => (
          <Box
            maxW="sm"
            h={321}
            borderWidth="1px"
            borderRadius="sm"
            borderColor="whiteAlpha.100"
            boxShadow={["base"]}
            overflow="hidden"
            overflowY="clip"
            textOverflow="ellipsis"
            bgColor="whiteAlpha.100"
          >
            <Stack>
              <Skeleton height="167px" />
              <Box p={4}>
                <SkeletonCircle />
                <SkeletonText mt={4} />
              </Box>
            </Stack>
          </Box>
      ))}
    </SimpleGrid>
  );
};
