import { Button, ButtonProps } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface Props extends ButtonProps {
  isActive?: boolean;
  Icon: IconType;
}

const ButtonMosaicLayout = ({ isActive, Icon, ...props }: Props) => (
  <Button
    {...props}
    rounded={"sm"}
    _hover={{ bgColor: "primary.600", color: "primary.400" }}
    bgColor={isActive ? "primary.500" : "primary.100"}
    opacity={isActive ? "1" : "0.5"}
  >
    <Icon size={18} color={isActive ? "white" : "black"} opacity={isActive ? "1" : "0.5"} />
  </Button>
);

export default ButtonMosaicLayout;
