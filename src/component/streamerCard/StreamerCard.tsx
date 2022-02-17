import { ViewIcon } from "@chakra-ui/icons";
import "./StreamerCard.css";
import SocialLinks from "../socialLinks/SocialLinks";
import {
  Box,
  Divider,
  Flex,
  Image,
  Link,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { chakra } from "@chakra-ui/react";
import { StreamerModel } from "../../model/StreamerModel";
var format = require('format-duration')


interface Props {
  streamer: StreamerModel;
}

export default function StreamerCard(props: Props) {
  const streamer = props.streamer;
  const [timeStreaming, setTimeStreaming] = React.useState('');

  React.useEffect(() => {
    const updateClock = () => {
      setTimeStreaming(
        
        format(new Date().getTime() - Date.parse(streamer.started_at))
        
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
            {timeStreaming}
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

      <Box pl="5" pr="5" pb="2" pt="4">

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

        <chakra.div h='70px'>
          <chakra.p className="description" overflow="hidden" textOverflow="ellipsis">
            {streamer.description}
          </chakra.p>
        </chakra.div>

        <Divider mt="3" mb="4"></Divider>
        <SocialLinks streamer={streamer} />
      </Box>
    </Box>
  );
}
