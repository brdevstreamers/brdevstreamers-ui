import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Icon,
  Image,
  Link,
  Tag,
  TagLabel,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { chakra } from "@chakra-ui/react";
import { StreamerModel } from "./model/StreamerModel";
import { FaExternalLinkAlt, FaGithub, FaTwitter } from "react-icons/fa";

interface Props {
  streamer: StreamerModel;
}

export default function StreamerCard(props: Props) {
  const streamer = props.streamer;
  const [timeStreaming, setTimeStreaming] = React.useState(new Date());

  React.useEffect(() => {
    const updateClock = () => {
      setTimeStreaming(
        new Date(
          new Date().getTime() - 3600000 - Date.parse(streamer.started_at)
        )
      );
    };

    setInterval(() => updateClock(), 1000);
  }, [streamer.started_at]);

  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      overflowY="clip"
      textOverflow="ellipsis"
      background="white"
    >
      <Link href={"https://twitch.tv/" + streamer.user_name} isExternal={true}>
        <Box
          h="180"
          w="100%"
          position="relative"
          backgroundImage={streamer.thumbnail_url
            .replace("{width}", "640")
            .replace("{height}", "360")}
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
        >
          <Tag
            size="sm"
            position="absolute"
            right={1}
            bottom={1}
            margin="auto"
            variant="solid"
            bg="red.500"
          >
            {timeStreaming.toLocaleTimeString()}
          </Tag>

          <Tag
            size="sm"
            position="absolute"
            left={1}
            bottom={1}
            margin="auto"
            variant="solid"
            bg="primary.600"
          >
            <ViewIcon />
            &nbsp;{streamer.viewer_count}
          </Tag>
        </Box>
      </Link>

      <Box pl="6" pr="6" pb="6" pt="4">
        {/* {timeStreaming.getTime() < 1800000*4 && <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="gray.500"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              Começou há pouco!
            </Box>
          </Box>} */}
        <Link
          href={"https://twitch.tv/" + streamer.user_name}
          isExternal={true}
        >
          <Flex mt="0" fontWeight="semibold" lineHeight="tight">
            <Image
              w="8"
              borderRadius="full"
              src={streamer.profile_image_url}
              alt={streamer.user_name}
            />
            &nbsp;{streamer.user_name}
          </Flex>
        </Link>
        <chakra.p mt="2" fontWeight="semibold" lineHeight="tight" isTruncated>
          <Tooltip label={streamer.title} aria-label="A tooltip">
            {streamer.title}
          </Tooltip>
        </chakra.p>

        <Divider mt="3"></Divider>

        <chakra.div>
          <chakra.p overflow="hidden" textOverflow="ellipsis">
            {streamer.description}
          </chakra.p>
        </chakra.div>

        <Divider mt="3"></Divider>
        <Flex pt="3">
          {streamer.has_twitter && (
            <Link isExternal={true} href={"https://twitter.com/" + streamer.user_name}>
              <Tag
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="cyan"
              >
                <TagLabel>
                  <Icon as={FaTwitter}></Icon> Twitter{" "}
                </TagLabel>
              </Tag>
            </Link>
          )}
          {streamer.has_twitter && (
            <Link ml="1" isExternal={true} href={"https://github.com/" + streamer.user_name}>
              <Tag
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="blackAlpha"
              >
                <TagLabel>
                  <Icon as={FaGithub}></Icon> Github{" "}
                </TagLabel>
              </Tag>
            </Link>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
