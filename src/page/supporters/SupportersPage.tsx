import {
  Center,
  Container,
  Image,
  SkeletonCircle,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Link } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'
import axios from "axios";
import React from "react";
import Header from "../../component/header/Header";
import { SupporterModel } from "../../model/SupporterModel";

export default function SupportersPage() {
  const SUPPORTERS_URL = process.env.REACT_APP_SUPPORTERS || "";

  const [supporters, setSupporters] = React.useState([]);

  React.useEffect(() => {
    axios.get(SUPPORTERS_URL).then((response) => {
      setSupporters(response.data);
    });
  }, [SUPPORTERS_URL]);

  return (
    <>
      <Container maxW="container.lg">
        <Header title="Agradecimentos" />
        <Center>
          <Wrap mt="10" spacing="50px" justify='center'>
            {supporters.map((supporter: SupporterModel) => {
              return (
                <>
                  {supporter.redeemed && (
                    <WrapItem key={supporter.user_name}>
                      <VStack>
                        <Center>
                          <Link href={`https://twitch.tv/${{supporter.user_name}}`} isExternal  fontWeight="semibold" color="primary.400">
                            {supporter.user_name} <ExternalLinkIcon mx='2px' />
                          </Link>
                        </Center>
                        <Center>
                          {supporter.mamaco && (
                            <Image
                              borderRadius="full"
                              boxSize="150px"
                              src={`${process.env.REACT_APP_MAMACOS}/${supporter.user_name}.PNG`}
                              alt={supporter.user_name}
                              p="0"
                              fallbackSrc="./mamaco_anon.png"
                            />
                          )}

                          {!supporter.mamaco && (
                            <Image
                              borderRadius="full"
                              boxSize="150px"
                              src="./mamaco_anon.png"
                              alt={supporter.user_name}
                              p="5"
                            />
                          )}
                        </Center>
                        <Center>
                          <Text fontWeight="semibold" color="primary.500">
                            {supporter.mamaco}
                          </Text>
                        </Center>
                      </VStack>
                    </WrapItem>
                  )}
                </>
              );
            })}
          </Wrap>
        </Center>
      </Container>
    </>
  );
}
