import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Flex, VStack, Box, Button, Tag, Text } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { BsFillChatLeftTextFill, BsXLg } from "react-icons/bs";
import tmi from "tmi.js";
import { nanoid } from "nanoid";

import ButtonMosaicLayout from "./ButtonMosaicLayout";

interface Message {
  id: string;
  channel: string;
  user: string;
  message: string;
}

const Messages: React.FC<{ channels: string[] }> = ({ channels }) => {
  const [openMessages, setOpenMessages] = useState(false);
  const [selectedChannels, setSelectedChannel] = useState<string[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const client = useRef<tmi.Client>();
  const chatContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    client.current = new tmi.Client({ channels });
    client.current?.connect();

    client.current.on("message", (channel, user, message) => {
      setMessages((messages) =>
        [...messages, { id: nanoid(), channel, user: user["display-name"]!, message }].slice(-40),
      );
      if (chatContainer.current) {
        chatContainer.current.scrollTo(0, chatContainer.current.scrollHeight);
      }
    });

    return () => {
      client.current?.disconnect();
    };
  }, [openMessages, channels]);

  const handleTagClick = useCallback(
    (channel: string) => () => {
      const isSelected = selectedChannels.includes(channel);
      setSelectedChannel((channels) =>
        isSelected ? channels.filter((c) => c !== channel) : [...channels, channel],
      );
    },
    [selectedChannels],
  );

  const filteredMessages = useMemo(() => {
    if (selectedChannels.length === 0) return messages;
    return messages.filter((message) => selectedChannels.includes(message.channel));
  }, [messages, channels, selectedChannels]);

  return (
    <AnimatePresence initial={false}>
      {!openMessages && (
        <motion.div key="open-button" animate={{ opacity: 1 }} exit={{ opacity: 0, x: "100%" }}>
          <ButtonMosaicLayout
            position="fixed"
            bottom="4"
            right="4"
            isActive={true}
            onClick={() => setOpenMessages(!openMessages)}
            Icon={BsFillChatLeftTextFill}
          />
        </motion.div>
      )}
      {openMessages && (
        <motion.div
          transition={{ bounce: 0 }}
          initial={{ opacity: 0.5, width: 0 }}
          animate={{ opacity: 1, width: 360 }}
          exit={{ opacity: 0, width: 0 }}
        >
          <VStack
            alignItems="stretch"
            position="fixed"
            top="0"
            bottom="0"
            right="0"
            maxWidth="360px"
            width="360px"
            bgColor="gray.800"
            pt="4"
          >
            <Box px="4" alignSelf="flex-end">
              <Button
                bgColor={"gray.700"}
                color="gray.100"
                _hover={{ color: "#8B3DFF" }}
                onClick={() => setOpenMessages(!openMessages)}
              >
                <BsXLg />
              </Button>
            </Box>

            <Flex flexWrap="wrap" overflow="auto">
              {channels.map((channel) => {
                const isSelected = selectedChannels.some((c) => c === channel);

                return (
                  <Tag
                    key={channel}
                    m="1"
                    rounded="sm"
                    cursor="pointer"
                    onClick={handleTagClick(channel)}
                    color={isSelected ? "gray.100" : "gray.300"}
                    bgColor={isSelected ? "#8B3DFF" : "gray.800"}
                  >
                    {channel}
                  </Tag>
                );
              })}
            </Flex>

            <VStack
              align="items-start"
              overflowY="auto"
              px="4"
              pb="6"
              scrollBehavior="smooth"
              ref={chatContainer}
            >
              {filteredMessages.map(({ id, message, user }) => {
                return (
                  <Text key={id}>
                    <Text color="#8B3DFF" fontWeight="bold" as="span">
                      {user}
                    </Text>
                    <Text color="#fff" as="span">
                      : {message}
                    </Text>
                  </Text>
                );
              })}
            </VStack>
          </VStack>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Messages;
