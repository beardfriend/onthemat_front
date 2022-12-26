import { Container } from "@chakra-ui/react";

import Header from "./header/Header";

function Layout({ children, mode }) {
  // const color = useColorModeValue("white", "gray.800");
  return (
    <Container w="100%" maxW="100%" m="0" p="0">
      <Header mode={mode} />

      <Container
        w={"100%"}
        maxW={mode === "auth" ? "100%" : "xl"}
        minH="100vh"
        mt={{ base: "3.5rem", md: "4rem" }}
        p="0"
      >
        {children}
      </Container>
    </Container>
  );
}

export default Layout;

Layout.defaultProps = {
  mode: "auth",
};
