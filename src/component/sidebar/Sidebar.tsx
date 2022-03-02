import React from "react";
import {
  Button,
  Center,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
  VStack,
  Box,
  Flex,
  Tag,
  Tooltip,
} from "@chakra-ui/react";
import {
  BsBroadcast,
  BsCameraVideo,
  BsColumnsGap,
  BsShuffle,
  BsFillCollectionPlayFill,
  BsGridFill,
  BsGrid1X2Fill,
} from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { UserInteractionType } from "../../model/UserInteractionModel";
import { logUserInteraction } from "../../service/StatsService";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
  streamingUrls: string[];
  selectedStreams: string[];
  setMosaicModeOn(mosaicModeOn: boolean): void;
}

export default function Sidebar(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticated } = useAuth0();

  const [mosaicModeOn, setMosaicModeOn] = React.useState(false);
  const [selectedStream, setSelectedStream] = React.useState("");
  const [streams, setStreams] = React.useState<string[]>([]);
  const [layout, setLayout] = React.useState<"grid" | "focus">("grid");

  const isGridLayout = layout === "grid";

  const handleLayout = () => {
    layout === "grid" ? setLayout("focus") : setLayout("grid");
  };

  const logClick = (user_login: string) => {
    logUserInteraction(
      user_login,
      UserInteractionType.STREAM_CLICK,
      isAuthenticated,
      user?.nickname,
    );
  };

  const handleStreamFocus = (selectedStreamer: string) => {
    const selectedStream = props.selectedStreams.find(
      (streamer) => streamer === selectedStreamer,
    );
    setSelectedStream(selectedStream ?? "");

    const streams = props.selectedStreams.filter(
      (streamer) => streamer !== selectedStreamer,
    );
    setStreams(streams);
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

  React.useEffect(() => {
    props.setMosaicModeOn(mosaicModeOn);
  }, [mosaicModeOn, props]);

  React.useEffect(() => {
    setSelectedStream(props.selectedStreams[0]);
    setStreams(props.selectedStreams.slice(1));
  }, [props.selectedStreams]);

  return (
    <>
      <HStack
        spacing="24px"
        position="fixed"
        top="50%"
        ml="2"
        zIndex={1}
        transform={mosaicModeOn ? "translate(-20%,-50%)" : "translateY(-50%)"}
      >
        <VStack spacing={2} align="stretch">
          <Button
            data-testid="livesAnchorButton"
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
            data-testid="mosaicAnchorButton"
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
            onClick={() => {
              setMosaicModeOn(!mosaicModeOn);
            }}
          >
            <Stack spacing={0}>
              <Center>
                <Icon as={BsColumnsGap} />
              </Center>
              <Text fontSize="xs">Mosaico</Text>
            </Stack>
          </Button>

          <Button
            data-testid="vodsAnchorButton"
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

        {mosaicModeOn && (
          <VStack spacing={2} align="stretch">
            <Button
              data-testid="mosaicLeaveButton"
              onClick={() => {
                setMosaicModeOn((prevState) => !prevState);
              }}
              width="70px"
              height="70px"
              ml="0"
              mb="5"
              mr="10"
              fontSize="45px"
              backgroundColor="primary.600"
              color="white"
              _hover={{
                background: "white",
                color: "primary.600",
              }}
              aria-label="Sair"
            >
              <Stack spacing={0}>
                <Center>
                  <Icon as={AiOutlineClose} />
                </Center>
                <Text fontSize="xs">Sair</Text>
              </Stack>
            </Button>
            <Button
              data-testid="mosaicPlayButton"
              width="70px"
              height="70px"
              ml="0"
              mb="5"
              fontSize="45px"
              backgroundColor="primary.600"
              color="white"
              _hover={{
                background: "white",
                color: "primary.600",
              }}
              aria-label="Play"
              onClick={onOpen}
            >
              <Stack spacing={0}>
                <Center>
                  <Icon as={BsFillCollectionPlayFill} />
                </Center>
                <Text fontSize="xs">Play</Text>
              </Stack>
            </Button>
          </VStack>
        )}
      </HStack>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent
          data-testid="mosaicOverlay"
          backgroundColor="secondary.600"
          overflow="auto"
        >
          <ModalHeader color="white" pb="0">
            <Center gap="2">
              {props.selectedStreams.map((user_name) => {
                return (
                  <Tag
                    size="md"
                    variant="solid"
                    backgroundColor="secondary.700"
                  >
                    {user_name}
                  </Tag>
                );
              })}
            </Center>
            <Center mt="2">
              <Tooltip label={isGridLayout ? "Foco" : "Grade"}>
                <Button
                  onClick={handleLayout}
                  size="sm"
                  backgroundColor="secondary.700"
                  aria-label={`Usar layout ${isGridLayout ? "foco" : "grade"}`}
                  _hover={{ backgroundColor: "secondary.800" }}
                >
                  {isGridLayout ? (
                    <BsGrid1X2Fill size={18} />
                  ) : (
                    <BsGridFill size={18} />
                  )}
                </Button>
              </Tooltip>
            </Center>
          </ModalHeader>
          <ModalCloseButton
            data-testid="mosaicOverlayCloseButton"
            color="white"
          />
          <ModalBody>
            {isGridLayout ? (
              <SimpleGrid columns={2} spacing={1} height="80vh">
                {props.selectedStreams.map((user_name, index) => {
                  return (
                    <Box
                      as="iframe"
                      key={index}
                      title={user_name}
                      minH={276}
                      src={
                        "https://player.twitch.tv/?channel=" +
                        user_name +
                        "&parent=" +
                        process.env.REACT_APP_DOMAIN +
                        "&enableExtensions=false&muted=false&volume=1.0&quality=auto&controls=true&allowFullScreen=true"
                      }
                      height="100%"
                      width="100%"
                    />
                  );
                })}
              </SimpleGrid>
            ) : (
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Box
                  as="iframe"
                  title={selectedStream}
                  w={{ base: "100%", md: "90vw", lg: "60vw" }}
                  h={{ base: "100%", md: "35vh", lg: "65vh" }}
                  mb={3}
                  src={
                    "https://player.twitch.tv/?channel=" +
                    selectedStream +
                    "&parent=" +
                    process.env.REACT_APP_DOMAIN +
                    "&enableExtensions=false&muted=false&volume=1.0&quality=auto&controls=true&allowFullScreen=true"
                  }
                />
                <Flex wrap="wrap" justify="center" gap={3}>
                  {streams.map((streamer) => (
                    <Box
                      key={streamer}
                      onClick={() => handleStreamFocus(streamer)}
                      cursor="pointer"
                    >
                      <Box
                        as="iframe"
                        w="100%"
                        title={streamer}
                        pointerEvents="none"
                        src={`https://player.twitch.tv/?channel=${streamer}&parent=${process.env.REACT_APP_DOMAIN}&enableExtensions=false&muted=false&volume=1.0&quality=auto&controls=true&allowFullScreen=true`}
                      />
                    </Box>
                  ))}
                </Flex>
              </Flex>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
