import { Box, Heading, Image, Text, VStack, Wrap } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import LandingLayout from "../components/layouts/LandingLayout";
import { SupporterModel } from "../model/SupporterModel";

export default function Supporters() {
  const SUPPORTERS_URL = process.env.REACT_APP_SUPPORTERS || "";

  const [supporters, setSupporters] = useState<SupporterModel[]>([]);

  useEffect(() => {
    axios.get(SUPPORTERS_URL).then((response) => {
      setSupporters(response.data);
    });
  }, [SUPPORTERS_URL]);

  return (
    <LandingLayout>
      <Box mt={8} mb={4}>
        <Heading>Agradecimentos</Heading>
        <Text color={"gray.500"}>Saiba mais sobre o projeto!</Text>
      </Box>

      <Wrap justify="center" spacing="50px" mt="10">
        {supporters.map((supporter, index) => (
          <React.Fragment key={index}>
            {supporter.redeemed && (
              <VStack key={supporter.user_name} justify={"center"}>
                <Text color={"gray.400"}>{supporter.user_name}</Text>
                {supporter.mamaco ? (
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    src={`${process.env.REACT_APP_MAMACOS}/${supporter.user_name}.PNG`}
                    alt={supporter.user_name}
                    p="0"
                    fallbackSrc="./mamaco_anon.png"
                  />
                ) : (
                  <Image
                    borderRadius="full"
                    boxSize="150px"
                    src="./mamaco_anon.png"
                    alt={supporter.user_name}
                    p="5"
                  />
                )}
                <Text color={"primary.600"}>{supporter.mamaco}</Text>
              </VStack>
            )}
          </React.Fragment>
        ))}
      </Wrap>
    </LandingLayout>
  );
}
