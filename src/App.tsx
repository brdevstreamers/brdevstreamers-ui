import "./App.css";
import StreamerList from "./component/streamerList/StreamerList";
import Footer from "./component/footer/Footer";
import Sidebar from "./component/sidebar/Sidebar";
import {
  Center,
  chakra,
  Container,
  Divider,
  Grid,
  GridItem,
  Image,
  Link,
  Spinner,
  Text,
} from "@chakra-ui/react";
import VodList from "./component/vodList/VodList";
import ReactGA from "react-ga";
import React, { useEffect } from "react";

function App() {
  const [isReloading, setReloading] = React.useState(false);
  const [streamingUrls, setStreamingUrls] = React.useState([""]);

  const handleReloading = (reloading: boolean) => {
    setReloading(reloading);
  };

  const handleStreamingUrls = (streamingUrls: string[]) => {
    setStreamingUrls(streamingUrls);
  };

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  return (
    <>
    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
      <GridItem w='100%'>
        <chakra.div className="sidebar-desktop">
          <Sidebar streamingUrls={streamingUrls}></Sidebar>
        </chakra.div>
      </GridItem>
      <GridItem colSpan={5} w='100%'>
        <Center>
          <Image
            className="logo"
            src="/logo.svg"
            alt="Br Dev Streamers"
          ></Image>
        </Center>
        <Center>
          <chakra.h1 mb="0" lineHeight="10">
            Br Dev Streamers
          </chakra.h1>
        </Center>
        <Center>
          <chakra.h2 mt="0" lineHeight="8">
            Somos todos uma comunidade
          </chakra.h2>
        </Center>
        <Container maxW="container.lg">
          <Center mt="50px">
            <Text
              id="lives"
              lineHeight="7"
              p="2"
              borderRadius="6"
              className="category-title"
              fontSize="3xl"
            > 
              Lives
              {isReloading && <Spinner size="sm" ml="2" color="primary.400" />}
            </Text>
          </Center>
          <Center>
            <chakra.h4 mt="0" lineHeight="6">
              Prestigie quem está ao vivo
            </chakra.h4>
          </Center>
        </Container>
        <Container mt="5" maxW="container.lg">
          <StreamerList
            setStreamingUrls={handleStreamingUrls}
            setReloading={handleReloading}
          ></StreamerList>
        </Container>

        <Container mt="8" maxW="container.lg">
          <Divider mt="4" mb="8"></Divider>
          <Center>
            <Text
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
        <Container mt="5" mb="5" maxW="container.lg">
          <VodList></VodList>
        </Container>
        <Center>
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
        <Center className="mobile-footer">
          <Container
            height="100"
            maxW="container.xl"
          >
            <Footer streamingUrls={streamingUrls}></Footer>
          </Container>
        </Center>
      </GridItem>
      </Grid>
    </>
  );
}

export default App;
