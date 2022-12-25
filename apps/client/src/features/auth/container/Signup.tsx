import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import { emailRegex, passwordRegex, nicknameRegex } from "../../../utils/regex";
import { Link } from "react-router-dom";
import Google from "@Assets/social/google.png";
import Naver from "@Assets/social/naver.png";
import KaKao from "@Assets/social/kakao.png";
import { CheckIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

function Signup() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowPasswordRepeat, setIsShowPasswordRepeat] = useState(false);
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isUsablePassword, setIsUsablePassword] = useState("");
  const [isUsableEmail, setIsUsableEmail] = useState(false);
  const [isNotExistEmail, setIsNotExistEmail] = useState(false);
  const [isUsableNickname, setIsUsableNickname] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setIsUsableEmail(true);
    } else {
      setIsUsableEmail(false);
    }

    if (isNotExistEmail) {
      setIsNotExistEmail(false);
    }
  }

  function handleNicknameChange(e) {
    setNickname(e.target.value);
    if (nicknameRegex.test(e.target.value)) {
      setIsUsableNickname(true);
    } else {
      setIsUsableNickname(false);
    }
  }

  function handleEmailAlreadyExisit() {
    setIsNotExistEmail(true);
  }

  return (
    <Container>
      <Container>
        <Box>
          <Text mb="8px" fontSize="xs" as="b">
            이메일
          </Text>
          <InputGroup size="md">
            <Input
              placeholder="이메일을 입력해주세요"
              fontSize="xs"
              focusBorderColor="green.600"
              value={email}
              onChange={(e) => handleEmailChange(e)}
              isRequired={true}
            />
            <Flex>
              {isNotExistEmail && <InputRightElement children={<CheckIcon color="green.500" />} mr="4rem" />}
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" fontSize="0.7rem" onClick={handleEmailAlreadyExisit} disabled={!isUsableEmail}>
                  중복확인
                </Button>
              </InputRightElement>
            </Flex>
          </InputGroup>
        </Box>
        <Box mt="1rem">
          <Text mb="8px" fontSize="xs" as="b">
            닉네임
          </Text>
          <InputGroup size="md">
            <Input
              placeholder="닉네임을 입력해주세요"
              fontSize="xs"
              focusBorderColor="green.600"
              onChange={(e) => handleNicknameChange(e)}
            />
            {isUsableNickname && <InputRightElement children={<CheckIcon color="green.500" />} />}
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
          <InputGroup size="md" mt="0.5rem">
            <Input
              placeholder="비밀번호를 한 번 더 입력해주세요"
              type={isShowPasswordRepeat ? "text" : "password"}
              fontSize="xs"
              focusBorderColor="green.600"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" fontSize="0.7rem" onClick={() => setIsShowPasswordRepeat(!isShowPasswordRepeat)}>
                {isShowPasswordRepeat ? "숨기기" : "보기"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
        <Box mt="2rem">
          <Checkbox colorScheme="green">
            <Text fontSize="xs">
              <Link to="/ss">
                <span style={{ textDecoration: "underline" }}>이용약관</span>
              </Link>{" "}
              동의
            </Text>
          </Checkbox>
        </Box>
        <Button mt="1.5rem" colorScheme="green" variant="solid" w="100%" disabled>
          회원가입
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

export default Signup;
