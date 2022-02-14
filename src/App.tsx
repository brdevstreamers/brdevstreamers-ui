import React from 'react';
import './App.css';
import StreamerList from './StreamerList'
import { Center, chakra, Container, Image } from '@chakra-ui/react';
function App() {

  

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
      <StreamerList></StreamerList>
    </Container>
    </>
    )

}

export default App;
