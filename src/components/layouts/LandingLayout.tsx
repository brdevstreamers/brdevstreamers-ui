import React from "react";
import { Box, Container, Stack } from "@chakra-ui/react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

type Props = {
  children?: React.ReactNode;
};

export default function LandingLayout({ children }: Props) {
  return (
    <Stack>
      <Header />
      <Box m={[0, "center"]}>
        <Container maxW="container.xl" mb="10">
          {children}
        </Container>
      </Box>
      <Footer />
    </Stack>
  );
}
