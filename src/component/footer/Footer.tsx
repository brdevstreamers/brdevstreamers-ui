import {
  Button,
  Center,
  HStack,
  Icon,
  IconButton,
  Link,
  Text,
} from "@chakra-ui/react";
import { BsShuffle } from "react-icons/bs";

interface Props {
  streamingUrls: string[];
}

export default function Footer(props: Props) {
  const handleClick = () => {
    const user_name =
      props.streamingUrls[
        Math.floor(Math.random() * props.streamingUrls.length)
      ];
    window.open("https://www.twitch.tv/" + user_name, "_blank");
  };

  return (
    <>
      <HStack
        spacing={2}
        position="fixed"
        left="1%"
        mb="2"
      >
        <IconButton
          size="xl"
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
          icon={<Icon as={BsShuffle} onClick={handleClick} />}
        />
      </HStack>
    </>
  );
}
