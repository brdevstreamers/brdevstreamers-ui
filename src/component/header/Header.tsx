import { Center, chakra, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
  subtitle?: string;
}

export default function Header(props: Props) {
  return (
    <>
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
    </>
  );
}