import {
  Avatar,
  Box,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function Header({ logoUrl, loginType, mode }) {
  const color = useColorModeValue("gray.700", "white");
  const bg = useColorModeValue("white", "gray.700");
  const border = useColorModeValue("1px solid #E2E8F0", "none");
  return (
    <Container
      bg={mode === "auth" ? "#1C241A" : bg}
      w="100%"
      maxW="100%"
      height={{ base: "3.5rem", md: "4rem" }}
      position="fixed"
      top="0"
      borderBottom={mode !== "auth" ? border : "none"}
    >
      <Flex justify="space-between" marginX="auto" maxW="xl" height="100%" alignItems="center">
        <Box>
          <Text color={mode === "auth" ? "white" : color} fontSize={{ base: "lg", md: "xl" }} as="b">
            <Link to="/">OnTheMat</Link>
          </Text>
        </Box>
        {mode === "auth" ? (
          <Box>
            <Text color="white" fontSize={{ base: "xs", lg: "sm" }}>
              지금 여기
            </Text>
          </Box>
        ) : (
          <Box>
            {loginType !== "non" ? (
              <Menu>
                <MenuButton>
                  <Avatar name="Dan Abrahmov" src={logoUrl} size={{ base: "sm", md: "md" }} />
                </MenuButton>
                <MenuList mt="0.2rem">
                  <MenuGroup title="채용" bg="blue.100" textAlign="center">
                    <MenuItem>{loginType === "academy" ? "작성한 채용공고" : "지원한 채용공고"}</MenuItem>
                  </MenuGroup>
                  <MenuDivider />
                  <MenuGroup title="프로필" bg="blue.100" textAlign="center">
                    <MenuItem>마이페이지</MenuItem>
                    <MenuItem>로그아웃</MenuItem>
                  </MenuGroup>
                </MenuList>
              </Menu>
            ) : (
              <Flex w={{ base: "6rem", lg: "8rem" }} justify="space-between">
                <Text color="white" fontSize={{ base: "xs", lg: "sm" }}>
                  로그인
                </Text>
                <Text color="white" fontSize={{ base: "xs", lg: "sm" }}>
                  회원가입
                </Text>
              </Flex>
            )}
          </Box>
        )}
      </Flex>
    </Container>
  );
}

export default Header;

Header.defaultProps = {
  logoUrl: "https://bit.ly/dan-abramov",
  loginType: "teacher", // non / teacher / academy
  mode: "d",
};
