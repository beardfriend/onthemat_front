import { Flex, Image, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";

import PersonalImage from "@Assets/personal.png";
import HandShake from "@Assets/select/handshake.png";
import Layout from "@Shared/layout/Layout";
import { Fragment, useState } from "react";
import Academy from "../container/Academy";
import User from "../container/User";

function Me() {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Fragment>
      <Layout mode="default">
        <Flex direction="column" justify="center" alignItems="center" w="100%" pb="4rem">
          <Flex bg="#f5f5f5" w="100%" minW="100%" h="6rem" p="0" m="0" align="center" justify="center">
            <Text fontSize="lg" fontWeight="extrabold">
              마이 페이지
            </Text>
          </Flex>
          <Flex w="100%" justify="center" alignItems="center">
            <Tabs
              variant="enclosed"
              colorScheme="green"
              w={{ base: "100%" }}
              minH="42rem"
              onChange={(index) => setTabIndex(index)}
              borderRadius={{ base: "1rem", md: "2rem" }}
            >
              <TabList mb="1em" display="flex" justifyContent="center" gap="4rem">
                <Tab
                  name="login"
                  border="none"
                  display="flex"
                  gap="1rem"
                  _selected={{ color: "white", bg: "green.600" }}
                  borderRadius="none"
                >
                  <Image src={PersonalImage} w="2rem" filter={tabIndex === 0 ? `invert(100%)` : ``}></Image>
                  <Text>개인 프로필</Text>
                </Tab>
                <Tab
                  name="signup"
                  border="none"
                  display="flex"
                  gap="1rem"
                  borderRadius="none"
                  _selected={{ color: "white", bg: "green.600" }}
                >
                  <Image src={HandShake} w="2rem" filter={tabIndex === 1 ? `invert(100%)` : ``}></Image>
                  학원 프로필
                </Tab>
                <Tab name="resetPassword" border="none" display="none">
                  임시비밀번호 발급
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <User />
                </TabPanel>
                <TabPanel>
                  <Academy />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Flex>
        </Flex>
      </Layout>
    </Fragment>
  );
}

export default Me;
