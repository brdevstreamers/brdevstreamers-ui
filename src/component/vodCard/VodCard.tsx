import { ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Image,
  Link,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import { chakra } from "@chakra-ui/react";
import { VodModel } from "../../model/VodModel";
import SocialLinks from "../socialLinks/SocialLinks";
import { UserInteractionType } from "../../model/UserInteractionModel";
import { logUserInteraction } from "../../service/StatsService";
import { useAuth0 } from "@auth0/auth0-react";


interface Props {
  vod: VodModel;
}



export default function VodCard(props: Props) {
  const { isAuthenticated } = useAuth0();
  const vod = props.vod;
  
  const logClick = (user_login: string) => {
    (async () => {
      logUserInteraction(user_login, UserInteractionType.VOD_CLICK, isAuthenticated);
    })();
  }

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
      <Link href={"https://twitch.tv/videos/" + vod.stream_id} isExternal={true} onClick={() => logClick(vod.user_login)}>
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

      <Box position='relative' pl="5" pr="5" pb="2" pt="4">
        <Link
          href={"https://twitch.tv/" + vod.user_name}
          isExternal={true} onClick={() => logClick(vod.user_login)}
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
        <SocialLinks streamer={vod} />
      </Box>
    </Box>
  );
}
