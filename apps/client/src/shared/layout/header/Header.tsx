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
} from "@chakra-ui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function Header({ logoUrl, loginType, mode, handleLogout }) {
  return (
    <Fragment>
      <Container
        bg={"#1C241A"}
        w="100%"
        maxW="100%"
        height={{ base: "3.5rem", md: "4rem" }}
        position="fixed"
        top="0"
        border="none"
        zIndex="999"
      >
        <Flex justify="space-between" marginX="auto" maxW="xl" height="100%" alignItems="center">
          <Box>
            <Text color={"white"} fontSize={{ base: "lg", md: "xl" }} as="b">
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
                      <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              ) : (
                <Flex w={{ base: "6rem", lg: "8rem" }} justify="space-between">
                  <Text color="white" fontSize={{ base: "xs", lg: "sm" }}>
                    <Link to="/account/login">로그인</Link>
                  </Text>
                  <Text color="white" fontSize={{ base: "xs", lg: "sm" }}>
                    <Link to="/account/signup">회원가입</Link>
                  </Text>
                </Flex>
              )}
            </Box>
          )}
        </Flex>
      </Container>
    </Fragment>
  );
}

export default Header;

Header.defaultProps = {
  logoUrl: "https://bit.ly/dan-abramov",
  loginType: "teacher", // non / teacher / academy / user
  mode: "d",
};
