import { AspectRatio, SimpleGrid } from "@chakra-ui/react";
import { getEmbedUrl } from "../../utils/twitch";

type Props = {
  channels: Array<string>;
};

const MosaicGrid = ({ channels }: Props) => (
  <SimpleGrid columns={2} gap={2} placeContent={"center"}>
    {channels.map((channel) => {
      return (
        <AspectRatio key={channel} ratio={16 / 9}>
          <iframe title={channel} src={getEmbedUrl(channel)} />
        </AspectRatio>
      );
    })}
  </SimpleGrid>
);

export default MosaicGrid;
