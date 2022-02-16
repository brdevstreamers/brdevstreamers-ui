import { Button, Center, Icon, IconButton, Link, Text } from "@chakra-ui/react";
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
      <Center>
        <IconButton size='lg'
          mt="2"
          aria-label="Search database"
          icon={<Icon as={BsShuffle} onClick={handleClick} />}
        />
      </Center>
      <Center mt='2'>
        <Text color="primary.500" fontWeight="semibold">
          feito com ♥ por{" "}
          <Link
            isExternal={true}
            href="https://twitch.tv/flaviojmendes"
            color="primary.400"
          >
            flaviojmendes
          </Link>
        </Text>
      </Center>
    </>
  );
}
