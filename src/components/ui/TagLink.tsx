import { Icon, Link, Tag, VisuallyHidden, BackgroundProps } from "@chakra-ui/react";
import { IconType } from "react-icons/lib";

interface TagLinkProps {
  url: string;
  name: string;
  backgroundColor: BackgroundProps["backgroundColor"];
  icon: IconType;
}

export const TagLink = ({ url, icon, name, backgroundColor }: TagLinkProps) => {
  return (
    <Link isExternal={true} href={url}>
      <Tag
        size="md"
        variant="solid"
        rounded="sm"
        aria-label={name}
        backgroundColor={backgroundColor}
        _hover={{
          filter: "brightness(0.9)",
        }}
      >
        <VisuallyHidden>{name}</VisuallyHidden>
        <Icon as={icon} />
      </Tag>
    </Link>
  );
};
