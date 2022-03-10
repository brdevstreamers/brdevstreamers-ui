import { Box, Link } from "@chakra-ui/react";
import { Channel } from "../../types/channel.types";

type Props = {
  channel: Channel;
};

const Preview = ({ channel }: Props) => (
  <Link
    href={"https://twitch.tv/" + channel.user_name}
    isExternal={true}
    position={"absolute"}
    inset={0}
  >
    <Box
      pointerEvents={"none"}
      as={"iframe"}
      position={"relative"}
      title={channel.user_login}
      src={
        "https://player.twitch.tv/?channel=" +
        channel.user_name +
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
