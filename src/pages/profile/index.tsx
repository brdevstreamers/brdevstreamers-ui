import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  Divider,
  VStack,
  useMediaQuery,
  Container,
  Box,
  useDisclosure,
  Tag,
  Wrap,
  WrapItem,
  Icon,
  Skeleton,
  SkeletonCircle,
  Grid,
  GridItem,
  chakra,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../../component/header/Header";
import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { UserModel } from "../../model/UserModel";
import UserForm from "../../component/userForm/UserForm";
import { FaDiscord, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { UserInteractionModel } from "../../model/UserInteractionModel";

const cookies = new Cookies();

export default function ProfilePage() {
  const [userData, setUserData] = React.useState<UserModel>({} as UserModel);
  const [userInteractionData, setUserInteractionData] = React.useState<
    UserInteractionModel[]
  >([]);
  const [isSmallerThan900px] = useMediaQuery("(max-width: 900px)");
  const [isLoading, setLoading] = React.useState(true);
  const { isOpen, onToggle } = useDisclosure();
  const { user } = useAuth0();

  useEffect(() => {
    (async () => {
      if (user) {
        setLoading(true);
        const res = await axios.get(
          process.env.NEXT_PUBLIC_PRIVATE_API_URL + "/api/user/" + user?.nickname,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          },
        );
        setUserData(res.data.__data__);

        const userInteractionResponse = await axios.get(
          process.env.NEXT_PUBLIC_PRIVATE_API_URL +
            "/api/userinteraction/" +
            user?.nickname,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: cookies.get("api_token"),
            },
          },
        );
        setUserInteractionData(userInteractionResponse.data);

        setLoading(false);
      }
    })();
  }, [user]);

  const getUser = async () => {
    setLoading(true);
    const res = await axios.get(
      process.env.NEXT_PUBLIC_PRIVATE_API_URL + "/api/user/" + user?.nickname,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: cookies.get("api_token"),
        },
      },
    );
    setUserData(res.data.__data__);
    setLoading(false);
  };

  const onSubmit = () => {
    getUser();
    onToggle();
  };

  return (
    <>
      <Header title="Meu Perfil" />
      <Container maxW={isSmallerThan900px ? "90vw" : "60vw"}>
        <Box w="100%">
          <Button mb="5" colorScheme="purple" float="right" onClick={onToggle}>
            Editar Perfil
          </Button>
        </Box>

        <VStack
          minH="md"
          borderWidth="1px"
          borderRadius="lg"
          position="relative"
          w="100%"
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          padding={4}
        >
          {/* Skeleton if the User Profile is Loading */}
          {isLoading && (
            <>
              <HStack>
                {!isSmallerThan900px && (
                  <chakra.div justifyContent="center">
                    <SkeletonCircle width="300px" height="300px" />
                  </chakra.div>
                )}
                <Stack
                  flex={1}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                >
                  {isSmallerThan900px && (
                    <Flex className="profileImg-mobile" flex={1}>
                      <SkeletonCircle width="300px" height='300px' />
                    </Flex>
                  )}

                  
                  <Skeleton height="20px" width="200px" />
                  
                  <Text textAlign={"center"} color="gray.700" px={3}>
                  <Skeleton height="20px" width="200px" />
                  </Text>
                  <Wrap justify="center">
                      <WrapItem>
                      <Skeleton height="20px" width="200px" />
                      </WrapItem>
                      <WrapItem>
                      <Skeleton height="20px" width="200px" />
                      </WrapItem>
                      <WrapItem>
                      <Skeleton height="20px" width="200px" />
                      </WrapItem>
                      <WrapItem>
                      <Skeleton height="20px" width="200px" />
                      </WrapItem>
                  </Wrap>
                </Stack>
              </HStack>
            </>
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          )}

          {!isLoading && (
            <>
              <UserForm
                isOpen={isOpen}
                userData={userData}
                onSubmit={onSubmit}
              />
              <HStack>
                {!isSmallerThan900px && (
                  <chakra.div justifyContent="center">
                    <Image
                      borderRadius="full"
                      objectFit="cover"
                      boxSize="50%"
                      src={user?.picture}
                    />
                  </chakra.div>
                )}
                <Stack
                  flex={1}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  p={1}
                >
                  {isSmallerThan900px && (
                    <Flex className="profileImg-mobile" flex={1}>
                      <Image
                        borderRadius="full"
                        objectFit="cover"
                        boxSize="100%"
                        src={user?.picture}
                      />
                    </Flex>
                  )}

                  <Heading
                    fontSize={"2xl"}
                    color="secondary.700"
                    fontFamily={"body"}
                  >
                    @{userData.user_login}
                  </Heading>
                  <Text textAlign={"center"} color="gray.700" px={3}>
                    {userData?.bio}
                  </Text>
                  <Wrap justify="center">
                    {userData.discord && (
                      <WrapItem>
                        <Tag
                          size="lg"
                          borderRadius="full"
                          variant="solid"
                          backgroundColor="#7289DA"
                        >
                          <Icon as={FaDiscord} mr="2" />
                          {userData.discord}
                        </Tag>
                      </WrapItem>
                    )}
                    {userData.linkedin && (
                      <WrapItem>
                        <Tag
                          size="lg"
                          borderRadius="full"
                          variant="solid"
                          backgroundColor="#0077B5"
                        >
                          <Icon as={FaLinkedin} mr="2" />
                          {userData.linkedin}
                        </Tag>
                      </WrapItem>
                    )}
                    {userData.twitter && (
                      <WrapItem>
                        <Tag
                          size="lg"
                          borderRadius="full"
                          variant="solid"
                          backgroundColor="#55ACEE"
                        >
                          <Icon as={FaTwitter} mr="2" />
                          {userData.twitter}
                        </Tag>
                      </WrapItem>
                    )}
                    {userData.github && (
                      <WrapItem>
                        <Tag
                          size="lg"
                          borderRadius="full"
                          variant="solid"
                          backgroundColor="#24292D"
                        >
                          <Icon as={FaGithub} mr="2" />
                          {userData.github}
                        </Tag>
                      </WrapItem>
                    )}
                  </Wrap>
                </Stack>
              </HStack>
              <Divider></Divider>
              <Heading as="h3" size="sm" mb="20px">
                Minha Atividade
              </Heading>
              <Table mt="5" size="sm" color="secondary.600">
                <Thead>
                  <Tr>
                    <Th color="secondary.600">Streamer</Th>
                    <Th color="secondary.600">Ação</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {userInteractionData.map(
                    (userInteraction: UserInteractionModel, index: number) => {
                      return (
                        <Tr key={index}>
                          <Td>{userInteraction.target_user}</Td>
                          <Td>{userInteraction.type}</Td>
                        </Tr>
                      );
                    },
                  )}
                </Tbody>
              </Table>
              {/*
              <Heading as="h3" size="lg" mb="20px">
                Recompensas
              </Heading>
              <RewardProgress label="Curso Udemy" value={80} />
              <RewardProgress label="Livro Técnico (até R$100)" value={40} />
              <RewardProgress label="Mentoria" value={27} /> */}
            </>
          )}
        </VStack>
      </Container>
    </>
  );
}
