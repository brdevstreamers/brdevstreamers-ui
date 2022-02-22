import React from "react";
import {
  Button,
  Center,
  chakra,
  Flex,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { StreamerModel } from "../../model/StreamerModel";
import "./StreamModal.css";
import { logClick } from "../../service/StatsService";
import { StreamType } from "../../model/StreamType";

interface Props {
  streamer: StreamerModel;
  timeStreaming: string;
}

export default function StreamModal(props: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size="xs"
        float="right"
        onClick={onOpen}
        _hover={{
          background: "primary.700",
          color: "white",
        }}
        backgroundColor="primary.800"
        color="white"
      >
        Prévia
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent className="modal-content">
          <ModalHeader p="2">
            <Flex>
              <Image
                w="10"
                mr="4"
                borderRadius="full"
                src={props.streamer.profile_image_url}
                alt={props.streamer.user_name}
              />
              <chakra.span mt="1">
                <Link
                  href={"https://twitch.tv/" + props.streamer.user_name}
                  isExternal={true}
                  onClick={() => logClick(props.streamer.user_login, StreamType.STREAM)}
                >
                  {props.streamer.user_name}
                </Link>
              </chakra.span>
              <Tag
                size="sm"
                ml="5"
                mt="auto"
                mb="auto"
                variant="solid"
                bg="red.500"
              >
                {props.timeStreaming}
              </Tag>
            </Flex>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody p="1">
            <Flex h="100%">
              <Center className="modal-stream">
                <iframe
                  title={props.streamer.user_login}
                  src={
                    "https://player.twitch.tv/?channel=" +
                    props.streamer.user_name +
                    "&parent=" +
                    process.env.REACT_APP_DOMAIN +
                    "&enableExtensions=false&muted=false&volume=1.0&quality=auto&controls=true&allowFullScreen=true"
                  }
                  height="100%"
                  width="100%"
                  onClick={() => console.log("clicou ")}
                ></iframe>{" "}
              </Center>
              <Center className="modal-chat">
                <iframe
                  title={props.streamer.user_login}
                  src={
                    "https://www.twitch.tv/embed/" +
                    props.streamer.user_name +
                    "/chat?parent=" +
                    process.env.REACT_APP_DOMAIN
                  }
                  height="100%"
                  width="100%"
                  onClick={() => console.log("clicou ")}
                ></iframe>
              </Center>
            </Flex>
          </ModalBody>

          <ModalFooter p="0"></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
