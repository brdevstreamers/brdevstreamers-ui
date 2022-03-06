import {
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsGrid1X2Fill, BsGridFill, BsX, BsXLg } from "react-icons/bs";
import ButtonMosaicLayout from "../ui/ButtonMosaicLayout";
import MosaicFocus from "../ui/MosaicFocus";
import MosaicGrid from "../ui/MosaicGrid";

type Props = {
  channels: Array<string>;
};

export default function Mosaic({ channels }: Props) {
  const [mosaicLayout, setMosaicLayout] = useState<"grid" | "focus">("grid");
  const [channelOnFocus, setChannelOnFocus] = useState<string>("");
  const [channelsOffFocus, setChannelsOffFocus] = useState<Array<string>>([]);
  const [activeLayout, setActiveLayout] = useState<boolean>(true);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const openMosaic = (): void => {
    if (channels.length <= 0) {
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
      setActiveLayout(false);
      focusOnChannel(channels[0]);
      setMosaicLayout("focus");
    } else {
      setActiveLayout(true);
      setMosaicLayout("grid");
    }
  };

  const focusOnChannel = (channelName: string): void => {
    // Set focus on channel.
    setChannelOnFocus(channelName);

    // Set available channels excluding the current one.
    setChannelsOffFocus(channels.filter((channel) => channel !== channelName));
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
          <ModalBody>
            <HStack justifyContent={"center"} mb={2}>
              <ButtonMosaicLayout
                isActive={activeLayout}
                layout={"grid"}
                changeMosaicLayout={changeMosaicLayout}
                Icon={BsGridFill}
              />
              <ButtonMosaicLayout
                isActive={!activeLayout}
                layout={"focus"}
                changeMosaicLayout={changeMosaicLayout}
                Icon={BsGrid1X2Fill}
              />
              <Button
                bgColor={"primary.500"}
                borderRadius={"sm"}
                _hover={{ bgColor: "primary.600", color: "primary.400" }}
                onClick={onClose}
              >
                <BsXLg />
              </Button>
            </HStack>

            {mosaicLayout === "grid" ? (
              <MosaicGrid channels={channels} />
            ) : (
              <MosaicFocus
                channelsOffFocus={channelsOffFocus}
                channelOnFocus={channelOnFocus}
                focusOnChannel={focusOnChannel}
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
