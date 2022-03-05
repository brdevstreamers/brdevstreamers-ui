import React, { useState } from "react";
import useFetch from "react-fetch-hook";
import {
  AspectRatio,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import LandingLayout from "../components/layouts/LandingLayout";
import Card from "../components/ui/Card";
import { Stream } from "../types/stream.types";
import { FiGrid, FiCoffee } from "react-icons/fi";
import { BsGrid1X2Fill, BsGridFill } from "react-icons/bs";

export default function Home() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isMosaicMode, setIsMosaicMode] = useState(false);
  const [mosaicLayout, setMosaicLayout] = useState<"grid" | "focus">("grid");
  const [selectedStreams, setSelectedStreams] = useState<string[]>([]);
  const [selectedStream, setSelectedStream] = useState<string>(
    selectedStreams[0],
  );

  const streamers = useFetch<Stream[]>(
    "https://brstreamers.dev:8000/public/streams",
  );

  const vods = useFetch<Stream[]>("https://brstreamers.dev:8000/public/vods");

  const handleMosaic = () => {
    if (selectedStreams.length <= 1) {
      toast({
        title: `Você deve selecionar pelo menos duas stream`,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });

      return;
    }

    onOpen();
  };

  const handleStreamToMosaic = (channelName: string) => {
    const stream = selectedStreams.find((stream) => stream === channelName);
    if (stream) {
      setSelectedStreams(selectedStreams.filter((item) => item !== stream));
    } else {
      setSelectedStreams([...selectedStreams, channelName]);
    }
  };

  const handleMosaicLayout = (type: string) => {
    setSelectedStream(selectedStreams[0]);
    if (type === "focus") {
      const streams = selectedStreams.filter(
        (item) => item !== selectedStreams[0],
      );
      setSelectedStreams(streams);
      setMosaicLayout("focus");
    } else {
      setMosaicLayout("grid");
    }
  };

  const handleStreamFocus = (channelName: string) => {
    // setSelectedStreams([...selectedStreams, selectedStream]);

    const selectedStream = selectedStreams.find(
      (streamer) => streamer === channelName,
    );
    setSelectedStream(selectedStream ?? "");

    const streams = selectedStreams.filter(
      (streamer) => streamer !== channelName,
    );
    setSelectedStreams(streams);
  };

  return (
    <LandingLayout>
      <HStack mt={8} mb={4}>
        <Box>
          <Heading>Ao vivo</Heading>
          <Text color={"gray.500"}>Prestigie quem está ao vivo!</Text>
        </Box>
        <Spacer />
        <Box>
          <Stack direction="row" spacing={4}>
            <Button
              leftIcon={<FiGrid />}
              variant="solid"
              rounded={"sm"}
              onClick={() => setIsMosaicMode(!isMosaicMode)}
            >
              Simultaneo
            </Button>
            <Button leftIcon={<FiCoffee />} variant="solid" rounded={"sm"}>
              Estou com sorte
            </Button>
          </Stack>
        </Box>
      </HStack>
      {streamers.isLoading ? (
        <Text color={"gray.200"}>Carregando..</Text>
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {streamers.data?.map((stream) => (
            <Card
              stream={stream}
              isLive={true}
              isMosaicMode={isMosaicMode}
              handleStreamToMosaic={handleStreamToMosaic}
            />
          ))}
        </SimpleGrid>
      )}

      <Box mt={8} mb={4}>
        <Heading>Transmissões passadas</Heading>
        <Text color={"gray.500"}>Veja o que deixaram gravado!</Text>
      </Box>
      {vods.isLoading ? (
        <Text color={"gray.200"}>Carregando..</Text>
      ) : (
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4 }} gap={4}>
          {vods.data?.map((stream) => (
            <Card stream={stream} isLive={false} isMosaicMode={false} />
          ))}
        </SimpleGrid>
      )}

      {isMosaicMode && (
        <>
          <Center>
            <Button
              position={"fixed"}
              bottom={10}
              rounded={"sm"}
              onClick={handleMosaic}
            >
              Iniciar
            </Button>
          </Center>

          <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent
              rounded={"none"}
              backgroundColor="secondary.600"
              overflow="auto"
            >
              <ModalHeader>
                <Heading>Ao vivo</Heading>
                <Text color={"gray.500"}>Você está no modo simultâneo</Text>
              </ModalHeader>
              <ModalCloseButton
                bgColor={"primary.500"}
                rounded={"sm"}
                _hover={{ bgColor: "primary.600", color: "primary.400" }}
              />
              <ModalBody>
                <HStack justifyContent={"center"} mb={2}>
                  <Button
                    onClick={() => handleMosaicLayout("grid")}
                    rounded={"sm"}
                    _hover={{ bgColor: "primary.600", color: "primary.400" }}
                    bgColor={
                      mosaicLayout === "grid" ? "primary.500" : "primary.100"
                    }
                    opacity={mosaicLayout === "grid" ? "1" : "0.5"}
                  >
                    <BsGridFill
                      size={18}
                      color={mosaicLayout === "grid" ? "white" : "black"}
                      opacity={mosaicLayout === "grid" ? "1" : "0.5"}
                    />
                  </Button>
                  <Button
                    onClick={() => handleMosaicLayout("focus")}
                    rounded={"sm"}
                    _hover={{ bgColor: "primary.600", color: "primary.300" }}
                    bgColor={
                      mosaicLayout === "focus" ? "primary.500" : "primary.100"
                    }
                    opacity={mosaicLayout === "focus" ? "1" : "0.5"}
                  >
                    <BsGrid1X2Fill
                      size={18}
                      color={mosaicLayout === "focus" ? "white" : "black"}
                      opacity={mosaicLayout === "focus" ? "1" : "0.5"}
                    />
                  </Button>
                </HStack>

                {mosaicLayout === "grid" ? (
                  <SimpleGrid columns={2} gap={2} placeContent={"center"}>
                    {selectedStreams.map((channelName) => {
                      return (
                        <AspectRatio key={channelName} ratio={16 / 9}>
                          <iframe
                            title={channelName}
                            src={
                              "https://player.twitch.tv/?channel=" +
                              channelName +
                              "&parent=" +
                              process.env.REACT_APP_DOMAIN +
                              "&enableExtensions=false&muted=false&volume=1.0&quality=auto&controls=true&allowFullScreen=true&width=640&height=320"
                            }
                          />
                        </AspectRatio>
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
                      // title={selectedStreams}
                      w={{ base: "100%", md: "90vw", lg: "60vw" }}
                      h={{ base: "100%", md: "35vh", lg: "65vh" }}
                      mb={3}
                      src={
                        "https://player.twitch.tv/?channel=" +
                        selectedStreams[0] +
                        "&parent=" +
                        process.env.REACT_APP_DOMAIN +
                        "&enableExtensions=false&muted=false&volume=1.0&quality=auto&controls=true&allowFullScreen=true"
                      }
                    />
                    <Flex wrap="wrap" justify="center" gap={3}>
                      {selectedStreams.map((streamer) => (
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
              <ModalFooter>
                <Button
                  bgColor={"primary.500"}
                  borderRadius={"sm"}
                  _hover={{ bgColor: "primary.600", color: "primary.400" }}
                  onClick={onClose}
                >
                  Sair
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </LandingLayout>
  );
}
