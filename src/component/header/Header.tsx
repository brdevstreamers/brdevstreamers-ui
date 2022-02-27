import {
  Box,
  Center,
  chakra,
  Image,
  StackDivider,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Login from "../login/Login";

interface Props {
  title: string;
  subtitle?: string;
}

export default function Header(props: Props) {

  const [isSmallerThan720px] = useMediaQuery("(max-width: 720px)");


  return (
    <>
     <Login />
      <VStack
        spacing={4}
        width="100%"
        align="stretch"
      >
        
       
        
        <Box>
          <Center>
            <Link to="/">
              <Image
                height={isSmallerThan720px ? "50vw" : "10vw"}
                width='auto'
                className="logo"
                src="/logo.svg"
                alt="Br Dev Streamers"
              ></Image>
            </Link>
          </Center>
          <Center>
            <chakra.h1 mb="0" lineHeight="10">
              {props.title}
            </chakra.h1>
          </Center>
          {props.subtitle && (
            <Center>
              <chakra.h2 mt="0" lineHeight="8">
                {props.subtitle}
              </chakra.h2>
            </Center>
          )}
          
        </Box>
      </VStack>
    </>
  );
}
