import { ViewIcon } from "@chakra-ui/icons";
import './VodCard.css';
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
      maxH="md"
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
          backgroundColor="#33374D"
          backgroundImage={vod.thumbnail_url
            .replace("%{width}", "640")
            .replace("%{height}", "360") || '/logo.svg'}
          backgroundRepeat="no-repeat"
          backgroundSize={vod.thumbnail_url ? 'cover' : '40%'}
          backgroundPosition='center'
          
        >
          
          <Tag
            size="sm"
            position="absolute"
            right={1}
            bottom={1}
            margin="auto"
            variant="solid"
            bg="purple.500"
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

      <Box position='relative' pl="6" pr="6" pb="2" pt="4">
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

        <chakra.div h='70px'>
          <chakra.p className="description" overflow="hidden" textOverflow="ellipsis">
            {vod.description}
          </chakra.p>
        </chakra.div>

        <Divider mt="3"mb='4'></Divider>
        <Flex >
          {vod.has_twitter && (
            <Link isExternal={true} href={"https://twitter.com/" + vod.user_name}>
              <Tag
                size="md"
                variant="solid"
                backgroundColor="rgb(29, 155, 240)"
                fontWeight='semibold'
                fontFamily='Livvic'
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
                variant="solid"
                backgroundColor="gray.700"
                fontWeight='semibold'
                fontFamily='Livvic'
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
