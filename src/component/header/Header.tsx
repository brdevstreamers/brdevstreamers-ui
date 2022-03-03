import {
  Center,
  chakra,
  HStack,
  Image,
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
      <Center>
        <HStack>
          <Link to="/">
            <Image
              height={isSmallerThan720px ? "30vw" : "6vw"}
              width="auto"
              className="logo"
              src="/logo.svg"
              alt="Br Dev Streamers"
            ></Image>
          </Link>

          <VStack spacing={4} width="100%" align="stretch">
              <chakra.h1
                mb="0"
                fontSize={isSmallerThan720px ? "20px !important" : "40px !important"}
                lineHeight={isSmallerThan720px ? "3" : "10"}
              >
                {props.title}
              </chakra.h1>
            {props.subtitle && (
                <chakra.h2 maxW='fit-content'
                  fontSize={isSmallerThan720px ? "18px !important" : "22px !important"}
                  mt="0"
                  lineHeight={isSmallerThan720px ? "5" : "8"}
                >
                  {props.subtitle}
                </chakra.h2>
            )}
          </VStack>
        </HStack>
      </Center>
    </>
  );
}
