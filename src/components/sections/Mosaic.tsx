import {
  Button,
  Center,
  chakra,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  useToast,
  VStack,
  type ButtonProps,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { BsGrid1X2Fill, BsGridFill, BsXLg } from "react-icons/bs";

import ButtonMosaicLayout from "../ui/ButtonMosaicLayout";
import MosaicFocus from "../ui/MosaicFocus";
import MosaicGrid from "../ui/MosaicGrid";
import Messages from "../ui/Messages";

const MotionButton = motion<ButtonProps>(chakra.button);

type Props = {
  channels: Array<string>;
};

export default function Mosaic({ channels }: Props) {
  const [mosaicLayout, setMosaicLayout] = useState<"grid" | "focus">("grid");
  const [channelOnFocus, setChannelOnFocus] = useState<string>("");
  const [channelsOffFocus, setChannelsOffFocus] = useState<Array<string>>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const openMosaic = (): void => {
    if (channels.length <= 1) {
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
      // setActiveLayout(false);
      focusOnChannel(channels[0]);
      setMosaicLayout("focus");
    } else {
      // setActiveLayout(true);
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
        <MotionButton
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          position="fixed"
          bgColor="primary.500"
          color="gray.800"
          minW={10}
          h={10}
          paddingInlineStart={4}
          paddingInlineEnd={4}
          fontSize="md"
          fontWeight="semibold"
          bottom={10}
          rounded="sm"
          onClick={openMosaic}
          data-test="start-simultaneous-button"
        >
          Iniciar
        </MotionButton>
      </Center>

      <Modal onClose={onClose} size={"full"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent rounded={"none"} backgroundColor="secondary.600" overflow="auto">
          <ModalBody>
            <HStack>
              <VStack flex="1" alignItems="streach">
                <HStack justifyContent={"center"} mb={2}>
                  <ButtonMosaicLayout
                    isActive={mosaicLayout === "grid"}
                    onClick={() => changeMosaicLayout("grid")}
                    Icon={BsGridFill}
                  />
                  <ButtonMosaicLayout
                    isActive={mosaicLayout === "focus"}
                    onClick={() => changeMosaicLayout("focus")}
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
              </VStack>

              <Messages channels={channels} />
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
