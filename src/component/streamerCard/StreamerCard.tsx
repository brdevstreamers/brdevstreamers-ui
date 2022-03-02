import { ViewIcon } from "@chakra-ui/icons";

import "./StreamerCard.css";
import SocialLinks from "../socialLinks/SocialLinks";
import { UserInteractionType } from "../../model/UserInteractionModel";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Link,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import { chakra } from "@chakra-ui/react";
import { StreamerModel } from "../../model/StreamerModel";
import StreamModal from "../streamModal/StreamModal";
import { logUserInteraction } from "../../service/StatsService";
import { useAuth0 } from "@auth0/auth0-react";
var format = require("format-duration");

interface Props {
  streamer: StreamerModel;
  mosaicModeOn: boolean;
  setStreamSelected(user_login: string): void;
}

export default function StreamerCard(props: Props) {
  const streamer = props.streamer;
  const [timeStreaming, setTimeStreaming] = React.useState("");
  const [isHover, setHover] = React.useState(false);
  const [streamSelected, setStreamSelected] = React.useState(false);
  const { user, isAuthenticated } = useAuth0();

  React.useEffect(() => {
    const updateClock = () => {
      setTimeStreaming(
        format(new Date().getTime() - Date.parse(streamer.started_at)),
      );
    };

    setInterval(() => updateClock(), 1000);
  }, [streamer.started_at]);

  const logClick = (user_login: string) => {
    (async () => {
      logUserInteraction(
        user_login,
        UserInteractionType.STREAM_CLICK,
        isAuthenticated,
        user?.nickname,
      );
    })();
  };

  const showPreview = (user_name: string) => {
    return (
      <>
        <chakra.div
          position="absolute"
          height="180px"
          width="100%"
          backgroundColor="rgba(255,255,255,0)"
        ></chakra.div>
        <iframe
          title={streamer.user_login}
          src={
            "https://player.twitch.tv/?channel=" +
            streamer.user_name +
            "&parent=" +
            process.env.REACT_APP_DOMAIN +
            "&enableExtensions=false&muted=true&quality=low&controls=false"
          }
          height="180"
          width="100%"
          onClick={() => console.log("clicou ")}
        ></iframe>
      </>
    );
  };

  const handleMosaicSelection = () => {
    props.setStreamSelected(streamer.user_login);
    setStreamSelected(!streamSelected);
  };

  return (
    <>
      <Box
        data-testid={`streamerCard-${streamer.id}`}
        backgroundColor="white"
        maxW="md"
        position="relative"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        overflowY="clip"
        textOverflow="ellipsis"
        border={props.mosaicModeOn ? "3px solid" : ""}
        borderColor={
          props.mosaicModeOn && streamSelected ? "#9D5CFF " : "#FFFFFF"
        }
        shadow={streamSelected ? "md" : "none"}
        className="streamer-card"
      >
        <Link
          href={"https://twitch.tv/" + streamer.user_name}
          isExternal={true}
          onClick={() => logClick(streamer.user_login)}
        >
          <Box
            h="180"
            w="100%"
            position="relative"
            backgroundImage={streamer.thumbnail_url
              .replace("{width}", "640")
              .replace("{height}", "360")}
            backgroundRepeat="no-repeat"
            backgroundSize="cover"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onTouchStart={() => setHover(true)}
            onTouchEnd={() => setHover(false)}
          >
            {isHover && showPreview(streamer.user_name)}
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
          <Grid templateColumns="repeat(5, 1fr)" h="100%" gap={6}>
            <GridItem w="100%" colSpan={3}>
              <Link
                href={"https://twitch.tv/" + streamer.user_name}
                isExternal={true}
                onClick={() => logClick(streamer.user_login)}
              >
                <Flex fontWeight="semibold">
                  <Image
                    w="8"
                    borderRadius="full"
                    src={streamer.profile_image_url}
                    alt={streamer.user_name}
                  />
                  &nbsp;{streamer.user_name}
                </Flex>
              </Link>
            </GridItem>
            <GridItem w="100%" colSpan={2}>
              <StreamModal
                streamer={streamer}
                timeStreaming={timeStreaming}
              ></StreamModal>
            </GridItem>
          </Grid>
          <chakra.p mt="2" fontWeight="semibold" lineHeight="tight" isTruncated>
            <Tooltip label={streamer.title} aria-label="A tooltip">
              {streamer.title}
            </Tooltip>
          </chakra.p>

          <Divider mt="3"></Divider>

          <chakra.div  overflow="hidden"
              textOverflow="ellipsis" h="70px">
            <chakra.p
              className="description"
             
            >
              {streamer.bio ? streamer.bio : streamer.description}
            </chakra.p>
          </chakra.div>

          <Divider mt="3" mb="4"></Divider>
          <SocialLinks streamer={streamer} />
        </Box>

        {props.mosaicModeOn && (
          <chakra.div
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            backdropFilter="blur(1px)"
            backgroundColor={
              streamSelected ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)"
            }
            cursor="pointer"
            onClick={handleMosaicSelection}
          ></chakra.div>
        )}
      </Box>
    </>
  );
}
