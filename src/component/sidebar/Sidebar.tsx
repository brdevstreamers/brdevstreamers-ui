import {
  Button,
  Center,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { BsBroadcast, BsCameraVideo, BsShuffle } from "react-icons/bs";
import { StreamType } from "../../model/StreamType";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
const fpPromise = FingerprintJS.load();

interface Props {
  streamingUrls: string[];
}

export default function Sidebar(props: Props) {

  
  const logClick = (user_login: string) => {
    (async () => {
      // Get the visitor identifier when you need it.
      const fp = await fpPromise;
      const result = await fp.get();

      axios.post(process.env.REACT_APP_API_URL + "/stats" || "", {
        user_login: user_login,
        access_date: new Date(),
        type: StreamType.STREAM,
        fingerprint: result.visitorId,
      });
    })();
  };
  
  const handleShuffleClick = () => {
    const user_name =
      props.streamingUrls[
        Math.floor(Math.random() * props.streamingUrls.length)
      ];
    logClick(user_name.toLowerCase());
    window.open("https://www.twitch.tv/" + user_name, "_blank");
  };


  const handleClick = (hash: string) => {
    document.querySelector(`#${hash}`)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <VStack
        spacing={2}
        align="stretch"
        position="fixed"
        top="50%"
        ml="2"
        zIndex={1}
        transform="translateY(-50%)"
      >
        <Button
          className="sidebar-button"
          width="70px"
          height="70px"
          ml="0"
          fontSize="45px"
          backgroundColor="primary.600"
          color="white"
          _hover={{
            background: "white",
            color: "primary.600",
          }}
          aria-label="Lives"
          onClick={() => handleClick("lives")}
        >
          <Stack spacing={0}>
            <Center>
              <Icon as={BsBroadcast} />
            </Center>
            <Text fontSize="xs">Lives</Text>
          </Stack>
        </Button>
        <Button
          className="sidebar-button"
          width="100px"
          height="100px"
          ml="0"
          fontSize="60px"
          backgroundColor="primary.600"
          color="white"
          _hover={{
            background: "white",
            color: "primary.600",
          }}
          aria-label="Shuffle"
          onClick={handleShuffleClick}
        >
          <Stack spacing={0}>
            <Center>
              <Icon as={BsShuffle} />
            </Center>
            <Text fontSize="xs">Estou com sorte</Text>
          </Stack>
        </Button>
        <Button
          className="sidebar-button"
          width="70px"
          height="70px"
          ml="0"
          fontSize="45px"
          backgroundColor="primary.600"
          color="white"
          _hover={{
            background: "white",
            color: "primary.600",
          }}
          aria-label="Vods"
          onClick={() => handleClick("vods")}
        >
          <Stack spacing={0}>
            <Center>
              <Icon as={BsCameraVideo} />
            </Center>
            <Text fontSize="xs">Vods</Text>
          </Stack>
        </Button>
      </VStack>
    </>
  );
}
