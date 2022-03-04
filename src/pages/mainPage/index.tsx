import StreamerList from "../../component/streamerList/StreamerList";
import BottomBar from "../../component/bottombar/BottomBar";
import Sidebar from "../../component/sidebar/Sidebar";

import {
  Center,
  chakra,
  Container,
  Divider,
  Grid,
  GridItem,
  Spinner,
  Text,
} from "@chakra-ui/react";
import VodList from "../../component/vodList/VodList";
import React from "react";
import Header from "../../component/header/Header";

export default function MainPage() {
  const [isReloading, setReloading] = React.useState(false);
  const [streamingUrls, setStreamingUrls] = React.useState([""]);
  const [mosaicModeOn, setMosaicModeOn] = React.useState(false);
  const [selectedStreams, setSelectedStreams] = React.useState<string[]>([]);

  const handleReloading = (reloading: boolean) => {
    setReloading(reloading);
  };

  const handleStreamingUrls = (streamingUrls: string[]) => {
    setStreamingUrls(streamingUrls);
  };

  const handleMosaicMode = (mosaicModeOn: boolean) => {
    setMosaicModeOn(mosaicModeOn);
  };

  const handleSelectedStreams = (selectedStreams: string[]) => {
    setSelectedStreams(selectedStreams);
  };

  return (
    <>
      <Header
        title="Br Dev Streamers"
        subtitle="Unindo a comunidade de Live Coding"
      ></Header>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem w="100%">
          <chakra.div className="sidebar-desktop">
            <Sidebar
              selectedStreams={selectedStreams}
              setMosaicModeOn={handleMosaicMode}
              streamingUrls={streamingUrls}
            />
          </chakra.div>
        </GridItem>
        <GridItem colSpan={5} w="100%">
          <Container maxW="container.lg">
            <Center mt="10px">
              <Text
                data-testid="livesAnchor"
                id="lives"
                lineHeight="7"
                p="2"
                borderRadius="6"
                className="category-title"
                fontSize="3xl"
              >
                Lives
                {isReloading && (
                  <Spinner size="sm" ml="2" color="primary.400" />
                )}
              </Text>
            </Center>
            <Center>
              <chakra.h4 mt="0" lineHeight="6">
                Prestigie quem está ao vivo
              </chakra.h4>
            </Center>
          </Container>
          <Container mt="4" maxW="container.lg">
            <StreamerList
              setStreamingUrls={handleStreamingUrls}
              setReloading={handleReloading}
              mosaicModeOn={mosaicModeOn}
              setMosaicModeOn={handleMosaicMode}
              setSelectedStreams={handleSelectedStreams}
            ></StreamerList>
          </Container>

          <Container mt="8" maxW="container.lg">
            <Divider mt="4" mb="8"></Divider>
            <Center>
              <Text
                data-testid="vodsAnchor"
                id="vods"
                lineHeight="7"
                p="2"
                borderRadius="6"
                className="category-title"
                fontSize="3xl"
              >
                Vods
              </Text>
            </Center>
            <Center>
              <chakra.h4 mt="0" lineHeight="6">
                Veja o que deixaram gravado
              </chakra.h4>
            </Center>
          </Container>
          <Container mt="4" mb="5" maxW="container.lg">
            <VodList></VodList>
          </Container>

          <Center className="mobile-footer">
            <Container height="10" maxW="container.xl">
              <BottomBar streamingUrls={streamingUrls}></BottomBar>
            </Container>
          </Center>
        </GridItem>
      </Grid>
    </>
  );
}
