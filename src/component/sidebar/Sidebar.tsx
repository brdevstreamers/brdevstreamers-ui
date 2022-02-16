import { Icon, IconButton, VStack } from "@chakra-ui/react";
import { BsBroadcast, BsCameraVideo, BsShuffle } from "react-icons/bs";

interface Props {
  streamingUrls: string[];
}

export default function Sidebar(props: Props) {
  const handleShuffleClick = () => {
    const user_name =
      props.streamingUrls[
        Math.floor(Math.random() * props.streamingUrls.length)
      ];
    window.open("https://www.twitch.tv/" + user_name, "_blank");
  };

  const handleLiveClick = (hash: string) => {
    window.location.hash = "";
    window.location.hash = "#" + hash;  
  }

  return (
    <>
      <VStack
        spacing={2}
        align="stretch"
        position="fixed"
        top="50%"
        ml="2"
        transform="translateY(-50%)"
      >
        <IconButton
          className="sidebar-button"
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
          
          onClick={() => handleLiveClick('lives')}
          icon={<Icon as={BsBroadcast} />}
        />
        <IconButton
          className="sidebar-button"
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
          icon={<Icon as={BsShuffle} />}
        />
        <IconButton
          className="sidebar-button"
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
          onClick={() => handleLiveClick('vods')}
          icon={<Icon as={BsCameraVideo} />}
        />
      </VStack>
    </>
  );
}
