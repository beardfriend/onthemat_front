import { Box, Button, Container, Flex, Image, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";

import Google from "@Assets/social/google.png";
import KaKao from "@Assets/social/kakao.png";
import Naver from "@Assets/social/naver.png";
import { useState } from "react";

function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <Container>
      <Container>
        <Box>
          <Text mb="8px" fontSize="xs" as="b">
            이메일
          </Text>
          <InputGroup size="md">
            <Input placeholder="이메일을 입력해주세요" fontSize="xs" focusBorderColor="green.600" />
          </InputGroup>
        </Box>

        <Box mt="1rem">
          <Text mb="8px" fontSize="xs" as="b">
            비밀번호
          </Text>
          <InputGroup size="md">
            <Input
              placeholder="비밀번호를 입력해주세요"
              type={isShowPassword ? "text" : "password"}
              fontSize="xs"
              focusBorderColor="green.600"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" fontSize="0.7rem" onClick={() => setIsShowPassword(!isShowPassword)}>
                {isShowPassword ? "숨기기" : "보기"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>

        <Button mt="1.5rem" colorScheme="green" variant="solid" w="100%" disabled>
          로그인
        </Button>
      </Container>

      <Flex h="3.5rem" justify="space-around" mt="4rem">
        <Text fontSize="xs" as="b">
          다른 계정으로 로그인하기
        </Text>
        <Flex direction="column" alignItems="center">
          <Image src={KaKao} h="3rem" />
          <Text fontSize="xs">Kakao</Text>
        </Flex>
        <Flex direction="column" alignItems="center">
          <Image src={Google} h="3rem" />
          <Text fontSize="xs">Google</Text>
        </Flex>
        <Flex direction="column" alignItems="center">
          <Image src={Naver} h="3rem" />
          <Text fontSize="xs">Naver</Text>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Login;
