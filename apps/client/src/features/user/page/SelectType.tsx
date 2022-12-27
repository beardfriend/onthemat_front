import Layout from "@Shared/layout/Layout";
import React from "react";
import TeacherType from "@Assets/select/yoga.png";
import BussinessType from "@Assets/select/handshake.png";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function SelectType() {
  return (
    <Layout mode="default">
      <Flex direction="column" minH="inherit" justify="center">
        <Text textAlign="center" fontSize="2xl" fontWeight="bold" color="white">
          회원 유형을 선택해주세요
        </Text>
        <Flex w="100%" justify="space-around" alignItems="center" mt="2rem">
          <Flex
            direction="column"
            h="30rem"
            alignItems="center"
            justify="space-evenly"
            background="white"
            px="4rem"
            _hover={{
              background: "rgba(116, 116, 116, 0.7)",
              color: "white",
              transition: "all ease-out 0.5s",
              borderRadius: "3rem",
            }}
          >
            <Image src={TeacherType} h="20rem" />
            <Box>
              <Text fontSize="xl" as="b">
                요가 선생님
              </Text>
            </Box>
          </Flex>
          <Link to="/academy/regist">
            <Flex
              direction="column"
              h="30rem"
              alignItems="center"
              justify="space-evenly"
              background="white"
              px="4rem"
              _hover={{
                background: "rgba(116, 116, 116, 0.7)",
                color: "white",
                transition: "all ease-out 0.5s",
                borderRadius: "3rem",
              }}
            >
              <Image src={BussinessType} h="20rem" />
              <Box>
                <Text fontSize="xl" as="b">
                  학원
                </Text>
              </Box>
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </Layout>
  );
}

export default SelectType;
