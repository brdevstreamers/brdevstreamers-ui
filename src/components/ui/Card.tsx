import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ViewIcon } from "@chakra-ui/icons";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
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

import type { Stream } from "../../types/stream.types";

import Preview from "./Preview";

type Props = {
  stream: Stream;
  isLive: boolean;
  isMosaicMode: boolean;
  handleStreamToMosaic?: (channelName: string) => void;
};

export default function Card({
  stream,
  isLive,
  isMosaicMode,
  handleStreamToMosaic = () => {},
}: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  return (
    <Box
      {...(!isMosaicMode && {
        as: "a",
        href: `https://twitch.tv/${stream.user_name}`,
        target: "_blank",
      })}
      onClick={() => handleStreamToMosaic(stream.user_name)}
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
                  src={stream.thumbnail_url
                    .replace("{width}", "640")
                    .replace("{height}", "360")}
                  alt={`Preview da live de ${stream.user_name}`}
                  position={"relative"}
                />
                {showPreview && <Preview stream={stream} />}
              </>
            ) : (
              <Image
                width="full"
                height="full"
                src={stream.thumbnail_url
                  .replace("%{width}", "640")
                  .replace("%{height}", "360")}
                alt={`Preview da live de ${stream.user_name}`}
                position={"relative"}
                fallbackSrc="cover-no-image.png"
              />
            )}
          </Box>
          <Box
            position={"absolute"}
            bottom={0}
            right={0}
            left={0}
            pointerEvents={"none"}
          >
            <HStack justify={"space-between"} m={2}>
              <Tag rounded={"sm"} size={"sm"}>
                <TagLeftIcon as={ViewIcon} />
                <TagLabel>{stream.viewer_count}</TagLabel>
              </Tag>
              {isLive ? (
                <Tag rounded={"sm"} size={"sm"}>
                  {formatDistanceToNow(Date.parse(stream.started_at), {
                    locale: ptBR,
                  })}
                </Tag>
              ) : (
                <Tag rounded={"sm"} size={"sm"}>
                  {stream.duration}
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
              src={stream.profile_image_url}
              alt={stream.user_name}
            />
            <Box>
              <Link
                isExternal={true}
                href={`https://twitch.tv/${stream.user_name}`}
                color={"gray.500"}
                fontWeight={"semibold"}
                mt={-1}
                _hover={{
                  color: "gray.200",
                  textDecoration: "underline",
                }}
              >
                {stream.user_login}
              </Link>

              <Text color={"gray.100"} fontSize={"sm"} mt={-1}>
                {stream.title}
              </Text>
            </Box>
          </HStack>
          <HStack gap={0.3} mt={4} justify={"end"}>
            {stream.twitter_url && (
              <Link
                isExternal={true}
                href={`https://twitter.com/${stream.twitter_url}`}
              >
                <Tag
                  aria-label="twitter"
                  rounded={"sm"}
                  size="md"
                  variant="solid"
                  backgroundColor="rgb(29, 155, 240)"
                  _hover={{
                    filter: "brightness(0.9)",
                  }}
                >
                  <VisuallyHidden>Twitter</VisuallyHidden>
                  <Icon as={FaTwitter} />
                </Tag>
              </Link>
            )}

            {stream.github_url && (
              <Link
                isExternal={true}
                href={`https://github.com/${stream.github_url}`}
              >
                <Tag
                  size="md"
                  variant="solid"
                  rounded={"sm"}
                  backgroundColor="gray.700"
                  _hover={{
                    filter: "brightness(0.9)",
                  }}
                >
                  <VisuallyHidden>GitHub</VisuallyHidden>
                  <Icon as={FaGithub} />
                </Tag>
              </Link>
            )}

            {stream.linkedin_url && (
              <Link
                isExternal={true}
                href={`https://linkedin.com/in/${stream.linkedin_url}`}
              >
                <Tag
                  size="md"
                  variant="solid"
                  rounded={"sm"}
                  backgroundColor="#0a66c2"
                  _hover={{
                    filter: "brightness(0.9)",
                  }}
                >
                  <VisuallyHidden>LinkedIn</VisuallyHidden>
                  <Icon as={FaLinkedin} />
                </Tag>
              </Link>
            )}

            {stream.discord_url && (
              <Link isExternal={true} href={stream.discord_url}>
                <Tag
                  size="md"
                  variant="solid"
                  rounded={"sm"}
                  backgroundColor="#7289da"
                  _hover={{
                    filter: "brightness(0.9)",
                  }}
                >
                  <VisuallyHidden>Discord</VisuallyHidden>
                  <Icon as={FaDiscord} />
                </Tag>
              </Link>
            )}

            {stream.instagram_url && (
              <Link isExternal={true} href={stream.instagram_url}>
                <Tag
                  size="md"
                  variant="solid"
                  rounded={"sm"}
                  backgroundColor="#C13584"
                  _hover={{
                    filter: "brightness(0.9)",
                  }}
                >
                  <VisuallyHidden>Instagram</VisuallyHidden>
                  <Icon as={FaInstagram} />
                </Tag>
              </Link>
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
          backgroundColor={
            isSelected ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)"
          }
          borderColor={isSelected ? "#9D5CFF " : "#FFFFFF"}
          shadow={isSelected ? "md" : "none"}
          borderWidth={isSelected ? 2 : 0}
        />
      )}
    </Box>
  );
}
