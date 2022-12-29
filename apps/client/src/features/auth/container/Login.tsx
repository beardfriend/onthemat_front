import Google from "@Assets/social/google.png";
import KaKao from "@Assets/social/kakao.png";
import Naver from "@Assets/social/naver.png";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import OnthematAPI from "@Shared/api/onthemat";
import { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex, passwordRegex } from "../../../utils/regex";

function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isUsableEmail, setIsUsableEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUsablePassword, setIsUsablePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function inputReset() {
    setEmail("");
    setPassword("");
    setIsUsablePassword(false);
    setIsUsableEmail(false);
  }
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

  async function handleLogin() {
    setIsLoading(true);
    try {
      const res = await OnthematAPI.Login({ email, password });
      if (res.status === 200) {
        inputReset();

        Cookies.set("accessToken", res.data.result.accessToken, {
          expires: 20000,
        });
        Cookies.set("refreshToken", res.data.result.refreshToken, {
          expires: 20000,
        });
        navigate("/");
      }
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string; code: number; details: string };
      console.log(errorData);
      if (errorData.code === 5001) {
        toast({
          status: "error",
          title: errorData.details,
          position: "top",
          duration: 1500,
        });
      } else {
        toast({
          status: "error",
          title: errorData.message,
          position: "top",
          duration: 1500,
        });
      }
    }
    setIsLoading(false);
  }

  function handleEnter(e) {
    if (e.key === "Enter" && isUsableEmail && isUsablePassword) {
      handleLogin();
    }
  }

  async function handleSocialLogin(type) {
    try {
      const res = await OnthematAPI.SocialLogin(type);
      window.location.replace(res.data.result);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Container p={0} px={{ base: 0, md: "1rem" }}>
      <Container p={0} px={{ base: 0, md: "1rem" }}>
        <form>
          <FormControl>
            <FormLabel mb="8px" fontSize="xs" as="b">
              이메일
            </FormLabel>
            <InputGroup size="md">
              <Input
                placeholder="이메일을 입력해주세요"
                fontSize="xs"
                focusBorderColor="green.600"
                type="email"
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />
            </InputGroup>
          </FormControl>

          <FormControl mt="1rem">
            <FormLabel fontSize="xs" as="b" mb="8px">
              비밀번호
            </FormLabel>
            <InputGroup size="md">
              <Input
                onChange={(e) => handlePasswordChange(e)}
                value={password}
                placeholder="비밀번호를 입력해주세요"
                type={isShowPassword ? "text" : "password"}
                fontSize="xs"
                autoComplete="on"
                focusBorderColor="green.600"
                onKeyDown={handleEnter}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" fontSize="0.7rem" onClick={() => setIsShowPassword(!isShowPassword)}>
                  {isShowPassword ? "숨기기" : "보기"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button
            mt="1.5rem"
            colorScheme="green"
            variant="solid"
            w="100%"
            isLoading={isLoading}
            onClick={handleLogin}
            disabled={!isUsableEmail || !isUsablePassword}
          >
            로그인
          </Button>
          <Text mt="0.5rem" fontSize="xs" textDecoration="underline">
            <Link to="/account/resetPassword">비밀번호 재설정</Link>
          </Text>
        </form>
      </Container>

      <Flex h="3.5rem" justify="center" gap="1rem" mt="4rem" flexDirection="column">
        <Box textAlign="center">
          <Text fontSize="xs" as="b">
            다른 계정으로 로그인하기
          </Text>
        </Box>
        <Flex justify="space-around">
          <Flex direction="column" alignItems="center" cursor="pointer" onClick={() => handleSocialLogin("kakao")}>
            <Image src={KaKao} h="3rem" />
            <Text fontSize="xs">Kakao</Text>
          </Flex>
          <Flex direction="column" alignItems="center" cursor="pointer" onClick={() => handleSocialLogin("google")}>
            <Image src={Google} h="3rem" />

            <Text fontSize="xs">Google</Text>
          </Flex>
          <Flex direction="column" alignItems="center" cursor="pointer" onClick={() => handleSocialLogin("naver")}>
            <Image src={Naver} h="3rem" />
            <Text fontSize="xs">Naver</Text>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
}

export default Login;
