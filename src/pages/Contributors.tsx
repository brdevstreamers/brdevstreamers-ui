import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Center, Heading, Image, Link, Spinner, Text, VStack, Wrap } from "@chakra-ui/react";

import type { Contributor } from "../types";

import LandingLayout from "../components/layouts/LandingLayout";
import { endpoints } from "../services/api";
import { useAxios } from "../hooks/useAxios";

export default function Contributors() {
  const { apiGet } = useAxios();

  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = useCallback(async () => {
    setIsLoading(true);

    const contributorsList = await apiGet<Contributor[]>(endpoints.contributors.url);

    setContributors(contributorsList);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <LandingLayout>
      <Box mt={8} mb={4}>
        <Heading>Quem já contribuiu</Heading>
        <Text color={"gray.500"}>Quer aparecer aqui? Basta contribuir com código!</Text>
      </Box>

      {isLoading ? (
        <Center mt={10}>
          <Spinner size="lg" color="gray.100" />
        </Center>
      ) : (
        <Wrap justify="center" spacing="50px" mt="10">
          {contributors.map((contributor, index) => (
            <React.Fragment key={index}>
             
                <VStack key={contributor.name} justify={"center"}>                   
                    <Image
                      borderRadius="full"
                      boxSize="150px"
                      src={contributor.image}
                      alt={contributor.name}
                      p="0"
                    />
                
                  <Link isExternal href={`https://github.com/${contributor.name}`} color={"primary.600"}>{contributor.name}</Link>
                </VStack>
              
            </React.Fragment>
          ))}
        </Wrap>
      )}
    </LandingLayout>
  );
}
