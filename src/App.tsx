import './App.css';
import StreamerList from './component/streamerList/StreamerList'
import Footer from './component/footer/Footer'
import { Center, chakra, Container, Image, Text } from '@chakra-ui/react';
import VodList from './component/vodList/VodList';
import ReactGA from 'react-ga';
import { useEffect } from 'react';

function App() {

  
  useEffect( () => {
    ReactGA.pageview(window.location.pathname + window.location.search); 
  });
  return (
    <>
    <Center>
      <Image className="logo" src="/logo.svg" alt='Br Dev Streamers'></Image>
    </Center>
    <Center>
      <chakra.h1 mb="0" lineHeight='10'>Br Dev Streamers</chakra.h1>
    </Center>
    <Center>
      <chakra.h2 mt="0" lineHeight='8'>Somos todos uma comunidade</chakra.h2>
    </Center>
    <Container mt='10' maxW='container.lg'>
      <Center>
        <Text lineHeight='7' p='2' borderRadius='6' className='category-title' fontSize='3xl'>Lives</Text>
      </Center>
    </Container>
    <Container mt='10' maxW='container.lg'>
      <StreamerList></StreamerList>
    </Container>
    <Container mt='10' maxW='container.lg'>
      <Center>
        <Text lineHeight='7' p='2' borderRadius='6' className='category-title' fontSize='3xl'>Vods</Text>
      </Center>
    </Container>
    <Container mt='10' maxW='container.lg'>
      <VodList></VodList>
    </Container>
    <Container mt='10' mb='5' maxW='container.lg'>
      <Footer></Footer>
    </Container>
    </>
    )

}

export default App;
