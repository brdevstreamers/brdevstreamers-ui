import React from 'react';
import './App.css';
import StreamerList from './StreamerList'
import { Center, Container, Image } from '@chakra-ui/react';
function App() {

  

  return (
    <>
    <Center>
      <Image src="/logo.png" alt='Br Dev Streamers'></Image>
      
    </Center>
    <Container maxW='container.lg'>
      <StreamerList></StreamerList>
    </Container>
    </>
    )

}

export default App;
