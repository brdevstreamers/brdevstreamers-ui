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
import { chakra } from "@chakra-ui/react";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { VodModel } from "../../model/VodModel";

interface Props {
  vod: VodModel;
}

export default function VodCard(props: Props) {
  const vod = props.vod;
  
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
      <Link href={"https://twitch.tv/" + vod.user_name} isExternal={true}>
        <Box
          h="180"
          w="100%"
          position="relative"
          backgroundImage={vod.thumbnail_url
            .replace("%{width}", "640")
            .replace("%{height}", "360")}
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
            {vod.duration}
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
            &nbsp;{vod.viewer_count}
          </Tag>
        </Box>
      </Link>

      <Box pl="6" pr="6" pb="6" pt="4">
        <Link
          href={"https://twitch.tv/" + vod.user_name}
          isExternal={true}
        >
          <Flex mt="0" fontWeight="semibold" lineHeight="tight">
            <Image
              w="8"
              borderRadius="full"
              src={vod.profile_image_url}
              alt={vod.user_name}
            />
            &nbsp;{vod.user_name}
          </Flex>
        </Link>
        <chakra.p mt="2" fontWeight="semibold" lineHeight="tight" isTruncated>
          <Tooltip label={vod.title} aria-label="A tooltip">
            {vod.title}
          </Tooltip>
        </chakra.p>

        <Divider mt="3"></Divider>

        <chakra.div>
          <chakra.p overflow="hidden" textOverflow="ellipsis">
            {vod.description}
          </chakra.p>
        </chakra.div>

        <Divider mt="3"></Divider>
        <Flex pt="3">
          {vod.has_twitter && (
            <Link isExternal={true} href={"https://twitter.com/" + vod.user_name}>
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
          {vod.has_github && (
            <Link ml="1" isExternal={true} href={"https://github.com/" + vod.user_name}>
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
