import { Box, Link, Text } from "@chakra-ui/react";
import { Stream } from "../../types/stream.types";

type Props = {
  stream: Stream;
};

const Preview = ({ stream }: Props) => (
  <Link
    href={"https://twitch.tv/" + stream.user_name}
    isExternal={true}
    position={"absolute"}
    inset={0}
  >
    <Box
      pointerEvents={"none"}
      as={"iframe"}
      position={"relative"}
      title={stream.user_login}
      src={
        "https://player.twitch.tv/?channel=" +
        stream.user_name +
        "&parent=" +
        process.env.REACT_APP_DOMAIN +
        "&enableExtensions=false&muted=true&quality=low&controls=false"
      }
      h={"full"}
      w={"full"}
    />
  </Link>
);

export default Preview;
