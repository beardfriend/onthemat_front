import { Flex, Grid, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

import DownCat from "@Assets/downcat.png";
import Layout from "@Shared/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import Login from "../container/Login";
import Signup from "../container/Signup";
import ResetPassword from "../container/ResetPassword";
import { useEffect, useState } from "react";

function Account() {
  const navigate = useNavigate();
  const [nowLocation, setNowLocation] = useState("login");
  let { mode } = useParams();

  const handleNavigatePage = (e) => {
    navigate(`/account/${e.target.name}`);
  };

  useEffect(() => {
    if (mode !== undefined) {
      setNowLocation(mode);
    }
  }, [mode]);

  return (
    <Layout mode="auth">
      <Flex bg="#1C241A" w="100%" maxW="100%" minH="100vh" mx="auto" alignItems="center" pb="4rem">
        <Grid maxW="xl" gridTemplateColumns={{ md: "1fr", xl: "repeat(2, 1fr)" }} mx="auto" w="100%">
          <Flex direction="column" alignItems="center" w="100%" justify="center">
            <Text color="white" as="b" fontSize={{ base: "3xl", md: "4xl" }}>
              요가는 매트 위에서
            </Text>
            <Image
              ml={{ base: 0, md: "7rem" }}
              src={DownCat}
              h={{ base: "26rem" }}
              objectFit="contain"
              alt="Dan Abramov"
            />
          </Flex>
          <Flex direction="column" justify="center" alignItems="center" w="100%" px={{ base: "0.5rem" }}>
            {mode === "resetPassword" ? (
              <ResetPassword />
            ) : (
              <Tabs
                defaultIndex={mode === "signup" ? 1 : 0}
                isFitted
                variant="enclosed"
                colorScheme="green"
                w={{ base: "100%" }}
                maxW="30rem"
                h="42rem"
                bg="white"
                borderRadius={{ base: "1rem", md: "2rem" }}
                border="5px solid #E2E8F0"
              >
                <TabList mb="1em">
                  <Tab onClick={(e) => handleNavigatePage(e)} name="login" border="none">
                    로그인
                  </Tab>
                  <div style={{ width: "1px", background: "#E2E8F0" }}></div>
                  <Tab onClick={(e) => handleNavigatePage(e)} name="signup" border="none">
                    회원가입
                  </Tab>
                  <Tab name="resetPassword" border="none" display="none">
                    임시비밀번호 발급
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <Signup />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            )}
          </Flex>
        </Grid>
      </Flex>
    </Layout>
  );
}

export default Account;
