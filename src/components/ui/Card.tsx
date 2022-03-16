import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ViewIcon } from "@chakra-ui/icons";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  Box,
  HStack,
  Icon,
  Image,
  Link,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";

import type { Channel } from "../../types/channel.types";

import Preview from "./Preview";
import { TagLink } from "./TagLink";

type Props = {
  channel: Channel;
  isLive: boolean;
  isMosaicMode: boolean;
  handleChannelToMosaic?: (channelName: string) => void;
  "data-test"?: string;
};

export default function Card({
  channel,
  isLive,
  isMosaicMode,
  handleChannelToMosaic = () => {},
  "data-test": dataTest,
}: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Box
      {...(!isMosaicMode && {
        as: "a",
        href: `https://twitch.tv/${channel.user_name}`,
        target: "_blank",
      })}
      onClick={() => handleChannelToMosaic(channel.user_name)}
      bgColor={"whiteAlpha.100"}
      maxW="sm"
      borderWidth="1px"
      borderColor={"whiteAlpha.100"}
      borderRadius={"sm"}
      overflow="hidden"
      boxShadow={["base"]}
      position={"relative"}
      _hover={{
        transform: "scale(1.05)",
      }}
      sx={{
        willChange: "transform",
        transform: "scale(1)",
        transition: "transform 300ms ease",
      }}
      data-test={dataTest}
    >
      <Box>
        <Box
          position={"relative"}
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
          rounded={"sm"}
        >
          <Box bgColor={"whiteAlpha.100"}>
            {isLive ? (
              <>
                <Image
                  width="full"
                  height="full"
                  src={channel.thumbnail_url.replace("{width}", "640").replace("{height}", "360")}
                  alt={`Preview da live de ${channel.user_name}`}
                  position={"relative"}
                />
                {showPreview && <Preview channel={channel} />}
              </>
            ) : (
              <Image
                width="full"
                height="full"
                src={channel.thumbnail_url.replace("%{width}", "640").replace("%{height}", "360")}
                alt={`Preview da live de ${channel.user_name}`}
                position={"relative"}
                fallbackSrc="cover-no-image.png"
              />
            )}
          </Box>
          <Box position={"absolute"} bottom={0} right={0} left={0} pointerEvents={"none"}>
            <HStack justify={"space-between"} m={2}>
              <Tag rounded={"sm"} size={"sm"}>
                <TagLeftIcon as={ViewIcon} />
                <TagLabel>{channel.viewer_count}</TagLabel>
              </Tag>
              {isLive ? (
                <Tag rounded={"sm"} size={"sm"}>
                  {formatDistanceToNow(Date.parse(channel.started_at), {
                    locale: ptBR,
                  })}
                </Tag>
              ) : (
                <Tag rounded={"sm"} size={"sm"}>
                  {channel.duration}
                </Tag>
              )}
            </HStack>
          </Box>
        </Box>
        <Box m={4}>
          <HStack alignItems={"start"}>
            <Image
              width="full"
              height="full"
              w={{ base: 8, md: 10 }}
              borderRadius="full"
              src={channel.profile_image_url}
              alt={channel.user_name}
            />
            <Box>
              <Text
                color={"gray.500"}
                fontWeight={"semibold"}
                mt={-1}
                _hover={{
                  color: "gray.200",
                  textDecoration: "underline",
                }}
              >
                {channel.user_login}
              </Text>

              <Text color={"gray.100"} fontSize={"sm"} mt={-1}>
                {channel.title}
              </Text>
            </Box>
          </HStack>
          <HStack gap={0.3} mt={4} justify={"end"}>
            {channel.twitter_url && (
              <TagLink
                url={`https://twitter.com/${channel.twitter_url}`}
                name="Twitter"
                backgroundColor="rgb(29, 155, 240)"
                icon={FaTwitter}
              />
            )}

            {channel.github_url && (
              <TagLink
                name="GitHub"
                url={`https://github.com/${channel.github_url}`}
                icon={FaGithub}
                backgroundColor="gray.700"
              />
            )}

            {channel.linkedin_url && (
              <TagLink
                name="Linkedin"
                url={`https://linkedin.com/in/${channel.linkedin_url}`}
                icon={FaLinkedin}
                backgroundColor="#0a66c2"
              />
            )}

            {channel.discord_url && (
              <TagLink
                name="Discord"
                url={channel.discord_url}
                icon={FaDiscord}
                backgroundColor="#7289da"
              />
            )}

            {channel.instagram_url && (
              <TagLink
                name="Instagram"
                url={channel.instagram_url}
                icon={FaInstagram}
                backgroundColor="#C13584"
              />
            )}
          </HStack>
        </Box>
      </Box>
      {isMosaicMode && (
        <Box
          position="absolute"
          inset={0}
          rounded={"sm"}
          backdropFilter={isSelected ? "blur(0)" : "blur(2px)"}
          cursor="pointer"
          onClick={() => setIsSelected(!isSelected)}
          backgroundColor={isSelected ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)"}
          borderColor={isSelected ? "#9D5CFF " : "#FFFFFF"}
          shadow={isSelected ? "md" : "none"}
          borderWidth={isSelected ? 2 : 0}
        />
      )}
    </Box>
  );
}
