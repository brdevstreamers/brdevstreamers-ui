import React from "react";

import { WrapItem, Icon, Link, Tag, TagLabel, Wrap } from "@chakra-ui/react";

import { FaGithub, FaTwitter, FaLinkedin, FaDiscord, FaInstagram } from "react-icons/fa";
import { ItemModel } from "../../model/ItemModel";
interface Props {
  streamer: ItemModel;
}

export default function SocialLinks(props: Props) {
  return (
    <>
      <Wrap>
        {/* Twitter Link  */}
        {props.streamer.twitter_url && (
          <WrapItem>
            <Link isExternal={true} href={props.streamer.twitter_url}>
              <Tag
                size="md"
                variant="solid"
                backgroundColor="rgb(29, 155, 240)"
                fontWeight="semibold"
                fontFamily="Livvic"
              >
                <TagLabel>
                  <Icon as={FaTwitter}></Icon> Twitter{" "}
                </TagLabel>
              </Tag>
            </Link>
          </WrapItem>
        )}
        {/* Github Link  */}
        {props.streamer.github_url && (
          <WrapItem>
            <Link ml="1" isExternal={true} href={props.streamer.github_url}>
              <Tag
                size="md"
                variant="solid"
                backgroundColor="gray.700"
                fontWeight="semibold"
                fontFamily="Livvic"
              >
                <TagLabel>
                  <Icon as={FaGithub}></Icon> Github{" "}
                </TagLabel>
              </Tag>
            </Link>
          </WrapItem>
        )}
        {/* Linkedin Link  */}
        {props.streamer.linkedin_url && (
          <WrapItem>
            <Link ml="1" isExternal={true} href={props.streamer.linkedin_url}>
              <Tag
                size="md"
                variant="solid"
                backgroundColor="#0a66c2"
                fontWeight="semibold"
                fontFamily="Livvic"
              >
                <TagLabel>
                  <Icon as={FaLinkedin}></Icon> Linkedin{" "}
                </TagLabel>
              </Tag>
            </Link>
          </WrapItem>
        )}
        {/* Discord Link  */}
        {props.streamer.discord_url && (
          <WrapItem>
            <Link ml="1" isExternal={true} href={props.streamer.discord_url}>
              <Tag
                size="md"
                variant="solid"
                backgroundColor="#7289da"
                fontWeight="semibold"
                fontFamily="Livvic"
              >
                <TagLabel>
                  <Icon as={FaDiscord}></Icon> Discord{" "}
                </TagLabel>
              </Tag>
            </Link>
          </WrapItem>
        )}
        {/* Instagram Link  */}
        {props.streamer.instagram_url && (
          <WrapItem>
            <Link ml="1" isExternal={true} href={props.streamer.instagram_url}>
              <Tag
                size="md"
                variant="solid"
                backgroundColor="#C13584"
                fontWeight="semibold"
                fontFamily="Livvic"
              >
                <TagLabel>
                  <Icon as={FaInstagram}></Icon> Instagram{" "}
                </TagLabel>
              </Tag>
            </Link>
          </WrapItem>
        )}
      </Wrap>
    </>
  );
}
