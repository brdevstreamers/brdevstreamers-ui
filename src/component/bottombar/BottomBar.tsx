import { useAuth0 } from "@auth0/auth0-react";
import {
  Button,
  Center,
  Grid,
  GridItem,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { BsBroadcast, BsCameraVideo, BsShuffle } from "react-icons/bs";
import { UserInteractionType } from "../../model/UserInteractionModel";
import { logUserInteraction } from "../../service/StatsService";

interface Props {
  streamingUrls: string[];
}

export default function BottomBar(props: Props) {
  const { user, isAuthenticated } = useAuth0();

  const handleShuffleClick = () => {
    const user_name =
      props.streamingUrls[
        Math.floor(Math.random() * props.streamingUrls.length)
      ];
    logUserInteraction(
      user_name,
      UserInteractionType.STREAM_CLICK,
      isAuthenticated,
      user?.nickname,
    );
    window.open("https://www.twitch.tv/ " + user_name, "_blank");
  };

  const handleClick = (hash: string) => {
    document.querySelector(`#${hash}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%"></GridItem>
        <GridItem w="100%">
          <Center>
            <Button
              size="xl"
              bottom="2"
              position="fixed"
              aria-label="Shuffle"
              fontSize="36px"
              width="70px"
              height="70px"
              mr="8"
              backgroundColor="primary.600"
              color="white"
              _hover={{
                background: "white",
                color: "primary.600",
              }}
              onClick={() => handleClick("lives")}
            >
              <Stack spacing={0}>
                <Center>
                  <Icon as={BsBroadcast} />
                </Center>
                <Text fontSize="xs">Lives</Text>
              </Stack>
            </Button>
          </Center>
        </GridItem>
        <GridItem w="100%">
          <Center>
            <Button
              size="xl"
              bottom="2"
              position="fixed"
              aria-label="Shuffle"
              fontSize="36px"
              width="100px"
              height="100px"
              backgroundColor="primary.600"
              color="white"
              _hover={{
                background: "white",
                color: "primary.600",
              }}
              onClick={handleShuffleClick}
            >
              <Stack spacing={0}>
                <Center>
                  <Icon as={BsShuffle} />
                </Center>
                <Text fontSize="xs">Shuffle</Text>
              </Stack>
            </Button>
          </Center>
        </GridItem>
        <GridItem w="100%">
          <Center>
            <Button
              size="xl"
              bottom="2"
              ml="8"
              position="fixed"
              aria-label="Shuffle"
              fontSize="36px"
              width="70px"
              height="70px"
              backgroundColor="primary.600"
              color="white"
              _hover={{
                background: "white",
                color: "primary.600",
              }}
              onClick={() => handleClick("vods")}
            >
              <Stack spacing={0}>
                <Center>
                  <Icon as={BsCameraVideo} />
                </Center>
                <Text fontSize="xs">Vods</Text>
              </Stack>
            </Button>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
}
