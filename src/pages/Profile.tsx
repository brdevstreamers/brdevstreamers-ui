import { useEffect } from "react";
import {
  Box,
  Heading,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Input,
  Avatar,
  Flex,
  Button,
  Textarea,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import LandingLayout from "../components/layouts/LandingLayout";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "../hooks/useForm";
import { UserModel } from "../model/UserModel";

import config from "../utils/config";
import axios from "axios";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { RiDiscordLine } from "react-icons/ri";
import { SiDiscord } from "react-icons/si";

export default function Profile() {
  const { user, token, authenticated } = useAuth();

  const initialState: UserModel = {
    user_login: user?.nickname || "",
    email: user?.email || "",
  };

  // getting the event handlers from our custom hook
  const { onChange, onSubmit, values } = useForm(updateProfile, initialState);

  async function updateProfile() {
    await axios.put(
      config.baseUrl + "/api/user",
      { ...values },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(values);
  }

  const loadUserData = async () => {
    const res = await axios.get(config.baseUrl + "/api/user/" + user?.nickname, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
  };

  useEffect(() => {
    if (!authenticated) {
      document.location.href = "/";
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [user]);
  return (
    <LandingLayout>
      <Box mt={8} mb={4}>
        <Heading>Perfil</Heading>
        <Text color={"gray.500"}>Aqui estão suas informações pessoais</Text>
      </Box>

      <Flex
        w={"full"}
        gap={6}
        p={6}
        bgColor={"whiteAlpha.100"}
        borderWidth="1px"
        borderColor={"whiteAlpha.100"}
        borderRadius={"sm"}
        overflow="hidden"
        boxShadow={["base"]}
        color={"gray.500"}
      >
        <Box>
          <Avatar size="2xl" name="Segun Adebayo" src={user?.picture} />
        </Box>
        <Box flex={1}>
          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel htmlFor="bio">Bio</FormLabel>
              <Textarea
                name="bio"
                id="bio"
                onChange={onChange}
                borderRadius={"sm"}
                borderColor={"whiteAlpha.100"}
                _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
                _hover={{ borderColor: "whiteAlpha.400" }}
              />
            </FormControl>
            <HStack gap={4} mt={4}>
              <FormControl>
                <FormLabel htmlFor="github">GitHub</FormLabel>

                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<FiGithub color="gray.300" />} />
                  <Input
                    name="github"
                    id="github"
                    onChange={onChange}
                    type="text"
                    borderRadius={"sm"}
                    borderColor={"whiteAlpha.100"}
                    _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
                    _hover={{ borderColor: "whiteAlpha.400" }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="linkedin">LinkedIn</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiLinkedin color="gray.300" />}
                  />
                  <Input
                    name="linkedin"
                    id="linkedin"
                    onChange={onChange}
                    type="text"
                    borderRadius={"sm"}
                    borderColor={"whiteAlpha.100"}
                    _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
                    _hover={{ borderColor: "whiteAlpha.400" }}
                  />
                </InputGroup>
              </FormControl>
            </HStack>
            <HStack gap={4} mt={4}>
              <FormControl>
                <FormLabel htmlFor="twitter">Twitter</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<FiTwitter color="gray.300" />}
                  />
                  <Input
                    name="twitter"
                    id="twitter"
                    onChange={onChange}
                    type="text"
                    borderRadius={"sm"}
                    borderColor={"whiteAlpha.100"}
                    _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
                    _hover={{ borderColor: "whiteAlpha.400" }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="discord">Discord</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<SiDiscord color="gray.300" />}
                  />
                  <Input
                    name="discord"
                    id="discord"
                    onChange={onChange}
                    type="text"
                    borderRadius={"sm"}
                    borderColor={"whiteAlpha.100"}
                    _focus={{ color: "white", borderColor: "whiteAlpha.400" }}
                    _hover={{ borderColor: "whiteAlpha.400" }}
                  />
                </InputGroup>
              </FormControl>
            </HStack>
            <Box mt={10} textAlign={"end"}>
              <Button
                type="submit"
                bgColor={"primary.500"}
                color={"white"}
                borderRadius={"sm"}
                _hover={{ bgColor: "primary.600", color: "primary.400" }}
              >
                Atualizar perfil
              </Button>
            </Box>
          </form>
        </Box>
      </Flex>
    </LandingLayout>
  );
}
