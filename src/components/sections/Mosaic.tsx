import {
  Button,
  Center,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsGrid1X2Fill, BsGridFill } from "react-icons/bs";
import MosaicFocus from "../ui/MosaicFocus";
import MosaicGrid from "../ui/MosaicGrid";

type Props = {
  selectedChannels: Array<string>;
};

export default function Mosaic({ selectedChannels }: Props) {
  const [mosaicLayout, setMosaicLayout] = useState<"grid" | "focus">("grid");
  const [selectedChannel, setSelectedChannel] = useState<string>("");
  const [availableChannels, setAvailableChannels] = useState(selectedChannels);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const openMosaic = (): void => {
    if (selectedChannels.length <= 0) {
      toast({
        title: `Você deve selecionar pelo menos duas streams`,
        isClosable: true,
        position: "top",
        variant: "left-accent",
      });

      return;
    }

    onOpen();
  };

  const changeMosaicLayout = (layoutName: string): void => {
    if (layoutName === "focus") {
      setSelectedChannel(selectedChannels[0]);
      const channels = selectedChannels.filter(
        (channel) => channel !== selectedChannels[0],
      );
      setAvailableChannels(channels);
      setMosaicLayout("focus");
    } else {
      setMosaicLayout("grid");
    }
  };

  const focusOnChannel = (channelName: string): void => {
    // Put all channel together.
    setAvailableChannels([...availableChannels, selectedChannel]);

    // Remove from the list of available channels.
    const channels = selectedChannels.filter(
      (channel) => channel !== channelName,
    );

    // Update list of available channels.
    setAvailableChannels(channels);

    // Set focus on channel.
    setSelectedChannel(channelName);
  };

  return (
    <>
      <Center>
        <Button
          position={"fixed"}
          bottom={10}
          rounded={"sm"}
          onClick={openMosaic}
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
                onClick={() => changeMosaicLayout("grid")}
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
                onClick={() => changeMosaicLayout("focus")}
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
              <MosaicGrid channels={selectedChannels} />
            ) : (
              <MosaicFocus
                channels={selectedChannels}
                channelOnFocus={selectedChannel}
                focusOnChannel={() => focusOnChannel}
              />
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
  );
}
