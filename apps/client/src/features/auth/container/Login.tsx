import { Box, Button, Container, Flex, Image, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";
import { emailRegex, passwordRegex } from "../../../utils/regex";
import Google from "@Assets/social/google.png";
import KaKao from "@Assets/social/kakao.png";
import Naver from "@Assets/social/naver.png";
import { useEffect, useState } from "react";
import EmailBox from "../components/EmailBox";

function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isUsableEmail, setIsUsableEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsablePassword, setIsUsablePassword] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setIsUsableEmail(true);
    } else {
      setIsUsableEmail(false);
    }
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (passwordRegex.test(e.target.value)) {
      setIsUsablePassword(true);
    } else {
      setIsUsablePassword(false);
    }
  }
  useEffect(() => {
    console.log(email);
    console.log(isUsableEmail, isUsablePassword);
  }, [email, password]);
  return (
    <Container>
      <Container>
        <EmailBox value={email} onChange={(e) => handleEmailChange(e)} />

        <Box mt="1rem">
          <Text mb="8px" fontSize="xs" as="b">
            비밀번호
          </Text>
          <InputGroup size="md">
            <Input
              onChange={(e) => handlePasswordChange(e)}
              value={password}
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

        <Button mt="1.5rem" colorScheme="green" variant="solid" w="100%" disabled={!isUsableEmail || !isUsablePassword}>
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
