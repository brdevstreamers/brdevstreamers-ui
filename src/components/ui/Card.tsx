import { ViewIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {
  FaDiscord,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Stream } from "../../types/stream.types";
import Preview from "./Preview";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type Props = {
  stream: Stream;
  isLive: boolean;
  isMosaicMode: boolean;
};

export default function Card({ stream, isLive, isMosaicMode }: Props) {
  const [showPreview, setShowPreview] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Box
      bgColor={"whiteAlpha.100"}
      maxW="sm"
      borderWidth="1px"
      borderColor={"whiteAlpha.100"}
      borderRadius={"sm"}
      overflow="hidden"
      boxShadow={["base"]}
      position={"relative"}
    >
      <Box>
        <Box
          position={"relative"}
          onMouseEnter={() => setShowPreview(true)}
          onMouseLeave={() => setShowPreview(false)}
        >
          <Box bgColor={"whiteAlpha.100"}>
            {isLive ? (
              <>
                <Image
                  src={stream.thumbnail_url
                    .replace("{width}", "640")
                    .replace("{height}", "360")}
                  position={"relative"}
                />
                {showPreview && <Preview stream={stream} />}
              </>
            ) : (
              <Image
                src={stream.thumbnail_url
                  .replace("%{width}", "640")
                  .replace("%{height}", "360")}
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
              w={{ sm: 8, md: 10, lg: 10 }}
              borderRadius="full"
              src={stream.profile_image_url}
              alt={stream.user_name}
            />
            <Box>
              <Link
                isExternal={true}
                href={"https://twitch.tv/" + stream.user_name}
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
                  size="md"
                  variant="solid"
                  backgroundColor="rgb(29, 155, 240)"
                >
                  <Icon as={FaTwitter} />
                </Tag>
              </Link>
            )}
            {stream.github_url && (
              <Link
                isExternal={true}
                href={`https://github.com/${stream.github_url}`}
              >
                <Tag size="md" variant="solid" backgroundColor="gray.700">
                  <Icon as={FaGithub} />
                </Tag>
              </Link>
            )}

            {stream.linkedin_url && (
              <Link
                isExternal={true}
                href={`https://linkedin.com/in/${stream.linkedin_url}`}
              >
                <Tag size="md" variant="solid" backgroundColor="#0a66c2">
                  <Icon as={FaLinkedin} />
                </Tag>
              </Link>
            )}

            {stream.discord_url && (
              <Link isExternal={true} href={stream.discord_url}>
                <Tag size="md" variant="solid" backgroundColor="#7289da">
                  <Icon as={FaDiscord} />
                </Tag>
              </Link>
            )}

            {stream.instagram_url && (
              <Link isExternal={true} href={stream.instagram_url}>
                <Tag size="md" variant="solid" backgroundColor="#C13584">
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
