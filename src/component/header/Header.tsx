import {
  Box,
  Center,
  chakra,
  Image,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import Login from "../login/Login";

interface Props {
  title: string;
  subtitle?: string;
}

export default function Header(props: Props) {
  return (
    <>
      <VStack
        spacing={4}
        width="100%"
        align="stretch"
      >
        <Box>
        <Login />
        </Box>
        <Box>
          <Center>
            <Link to="/">
              <Image
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
