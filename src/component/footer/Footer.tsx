import {
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { BsBroadcast, BsCameraVideo, BsShuffle } from "react-icons/bs";

interface Props {
  streamingUrls: string[];
}

export default function Footer(props: Props) {
  const handleShuffleClick = () => {
    const user_name =
      props.streamingUrls[
        Math.floor(Math.random() * props.streamingUrls.length)
      ];
    window.open("https://www.twitch.tv/" + user_name, "_blank");
  };

  const handleClick = (hash: string) => {
    document.querySelector(`#${hash}`)
      ?.scrollIntoView({
        behavior: 'smooth',
      });
  }

  return (
    <>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%"></GridItem>
          <GridItem w="100%">
            <Center>
            <IconButton
              size="xl"
              bottom="2"
              position="fixed"
              aria-label="Shuffle"
              fontSize="36px"
              width="70px"
              height="70px"
              mr='8'
              backgroundColor="primary.600"
              color="white"
              _hover={{
                background: "white",
                color: "primary.600",
              }}
              icon={<Icon as={BsBroadcast} onClick={() => handleClick('lives')} />}
            />
            </Center>
          </GridItem>
          <GridItem w="100%">
          <Center>
          <IconButton
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
            icon={<Icon as={BsShuffle} onClick={handleShuffleClick} />}
          />
          </Center>
          </GridItem>
          <GridItem w="100%">
          <Center>
          <IconButton
            size="xl"
            bottom="2"
            ml='8'
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
            icon={<Icon as={BsCameraVideo} onClick={() => handleClick('vods')} />}
          />
          </Center>
          </GridItem>
        </Grid>
    </>
  );
}
