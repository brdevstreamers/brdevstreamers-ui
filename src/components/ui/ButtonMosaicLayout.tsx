import { Button } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

type Props = {
  isActive: boolean;
  layout: string;
  changeMosaicLayout: (layout: string) => void;
  Icon: IconType;
};

const ButtonMosaicLayout = ({
  isActive,
  layout,
  changeMosaicLayout,
  Icon,
}: Props) => (
  <Button
    onClick={() => changeMosaicLayout(layout)}
    rounded={"sm"}
    _hover={{ bgColor: "primary.600", color: "primary.400" }}
    bgColor={isActive ? "primary.500" : "primary.100"}
    opacity={isActive ? "1" : "0.5"}
  >
    <Icon
      size={18}
      color={isActive ? "white" : "black"}
      opacity={isActive ? "1" : "0.5"}
    />
  </Button>
);

export default ButtonMosaicLayout;
