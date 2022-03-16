import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ViewIcon } from "@chakra-ui/icons";
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Link,
  Spacer,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";

import type { Channel } from "../../types/channel.types";

import Preview from "./Preview";

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
  const toast = useToast();

  const [showPreview, setShowPreview] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const copyToClipboard = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      await navigator.clipboard.writeText(`/raid ${channel.user_login}`);
      toast({
        title: `Comando "/raid ${channel.user_login}" copiado!`,
        status: "success",
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    } catch (error) {
      toast({
        title: "Não foi possível copiar o comando",
        status: "error",
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });
    }
  };

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
            <Box flex="1">
              <HStack mb="3">
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
                <Spacer />
                <Button
                  data-test="raid-button"
                  size="xs"
                  rounded="sm"
                  onClick={copyToClipboard}
                  bgColor="primary.500"
                  color="secondary.800"
                  _hover={{
                    bgColor: "primary.700",
                  }}
                >
                  Raid
                </Button>
              </HStack>

              <Text color={"gray.100"} fontSize={"sm"} mt={-1}>
                {channel.title}
              </Text>
            </Box>
          </HStack>
          <HStack gap={0.3} mt={4} justify={"end"}>
            {channel.twitter_url && (
              <Link isExternal={true} href={`https://twitter.com/${channel.twitter_url}`}>
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

            {channel.github_url && (
              <Link isExternal={true} href={`https://github.com/${channel.github_url}`}>
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

            {channel.linkedin_url && (
              <Link isExternal={true} href={`https://linkedin.com/in/${channel.linkedin_url}`}>
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

            {channel.discord_url && (
              <Link isExternal={true} href={channel.discord_url}>
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

            {channel.instagram_url && (
              <Link isExternal={true} href={channel.instagram_url}>
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
          backgroundColor={isSelected ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)"}
          borderColor={isSelected ? "#9D5CFF " : "#FFFFFF"}
          shadow={isSelected ? "md" : "none"}
          borderWidth={isSelected ? 2 : 0}
        />
      )}
    </Box>
  );
}
