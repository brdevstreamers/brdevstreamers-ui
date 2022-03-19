import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Center,
  Collapse,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Textarea,
  useMediaQuery,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { UserModel } from "../../../model/UserModel";
import { updateUser } from "../../../service/UserService";

interface Props {
  isOpen: boolean;
  userData: UserModel;
  onSubmit: () => void;
}

export default function UserForm(props: Props) {
  const { isAuthenticated } = useAuth0();

  const [isSmallerThan900px] = useMediaQuery("(max-width: 900px)");
  const [discord, setDiscord] = React.useState("");
  const [linkedin, setLinkedin] = React.useState("");
  const [twitter, setTwitter] = React.useState("");
  const [github, setGithub] = React.useState("");
  const [bio, setBio] = React.useState("");

  useEffect(() => {
    setDiscord(props.userData.discord || "");
    setLinkedin(props.userData.linkedin || "");
    setTwitter(props.userData.twitter || "");
    setGithub(props.userData.github || "");
    setBio(props.userData.bio || "");
  }, [props.userData]);

  const handleSubmit = () => {
    (async () => {
      if (isAuthenticated) {
        await updateUser(
          props.userData.user_login,
          props.userData.email,
          discord,
          linkedin,
          twitter,
          github,
          bio,
        );
        props.onSubmit();
      }
    })();
  };

  return (
    <>
      <Collapse in={props.isOpen} animateOpacity>
        <Box
          position="absolute"
          borderRadius="lg"
          left="0"
          top="0"
          width="100%"
          height="100%"
          backgroundColor="white"
          zIndex="1"
          p="3"
        >
          <Center>
            <Text mb="3" color="secondary.600" fontSize="2xl">
              Sobre Mim
            </Text>
          </Center>

          <Textarea
            my="3"
            placeholder="Conte um pouco sobre você.."
            value={bio}
            onChange={(event) => setBio(event.currentTarget.value)}
          />

          <Wrap>
            <WrapItem width={isSmallerThan900px ? "100%" : "49%"}>
              <InputGroup>
                <Input
                  borderLeftRadius="0"
                  placeholder="http://seu-discord.com"
                  value={discord}
                  onChange={(event) => setDiscord(event.currentTarget.value)}
                />
              </InputGroup>
            </WrapItem>
            <WrapItem width={isSmallerThan900px ? "100%" : "49%"}>
              <InputGroup>
                <InputLeftAddon>https://twitter.com/</InputLeftAddon>
                <Input
                  borderLeftRadius="0"
                  placeholder="username"
                  value={twitter}
                  onChange={(event) => setTwitter(event.currentTarget.value)}
                />
              </InputGroup>
            </WrapItem>
            <WrapItem width={isSmallerThan900px ? "100%" : "49%"}>
              <InputGroup>
                <InputLeftAddon>https://linkedin.com/in/</InputLeftAddon>
                <Input
                  borderLeftRadius="0"
                  placeholder="username"
                  value={linkedin}
                  onChange={(event) => setLinkedin(event.currentTarget.value)}
                />
              </InputGroup>
            </WrapItem>
            <WrapItem width={isSmallerThan900px ? "100%" : "49%"}>
              <InputGroup>
                <InputLeftAddon>https://github.com/</InputLeftAddon>
                <Input
                  borderLeftRadius="0"
                  placeholder="username"
                  value={github}
                  onChange={(event) => setGithub(event.currentTarget.value)}
                />
              </InputGroup>
            </WrapItem>
          </Wrap>
          <Center>
            <Button mt="3" mb="5" onClick={handleSubmit} colorScheme="purple">
              Salvar
            </Button>
          </Center>
        </Box>
      </Collapse>
    </>
  );
}
