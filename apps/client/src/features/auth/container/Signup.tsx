import Google from "@Assets/social/google.png";
import KaKao from "@Assets/social/kakao.png";
import Naver from "@Assets/social/naver.png";
import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import OnthematAPI from "@Shared/api/onthemat";
import { AxiosError } from "axios";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { emailRegex, nicknameRegex, passwordRegex } from "../../../utils/regex";

function Signup() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { isOpen, onOpen: toggleOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isUsablePassword, setIsUsablePassword] = useState(false);
  const [isUsableRePassword, setIsUsableRePassword] = useState(false);
  const [isUsableEmail, setIsUsableEmail] = useState(false);
  const [isNotExistEmail, setIsNotExistEmail] = useState(false);
  const [isUsableNickname, setIsUsableNickname] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  function inputReset() {
    setEmail("");
    setNickname("");
    setPassword("");
    setRePassword("");
    setIsAgree(false);
    setIsUsableNickname(false);
    setIsNotExistEmail(false);
    setIsUsableEmail(false);
    setIsUsableRePassword(false);
    setIsUsablePassword(false);
  }

  async function handleSocialSignup(type) {
    try {
      const res = await OnthematAPI.SocialLogin(type);
      window.location.replace(res.data.result);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSignUp() {
    setIsLoading(true);
    try {
      const res = await OnthematAPI.Singup({ email, password, nickname, termAgree: isAgree });
      if (res.status === 201) {
        toggleOpen();
        navigate("/account/login");
      }
    } catch (err) {
      toast({
        status: "error",
        title: "error",
        position: "top",
      });
    }
    inputReset();
    setIsLoading(false);
  }

  async function handleEmailAlreadyExisit() {
    try {
      const res = await OnthematAPI.CheckEmail(email);
      if (res.status === 200) {
        setIsNotExistEmail(true);
        toast({
          status: "success",
          title: "?????? ????????? ??????????????????.",
          position: "top",
          duration: 1500,
        });
      }
    } catch (err) {
      setIsNotExistEmail(false);
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string; code: number };
      toast({
        status: "error",
        title: errorData.message,
        position: "top",
        duration: 1500,
      });
    }
  }

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

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    if (passwordRegex.test(e.target.value)) {
      setIsUsablePassword(true);
    } else {
      setIsUsablePassword(false);
    }
  }

  function handleRePasswordChange(e) {
    setRePassword(e.target.value);
    if (passwordRegex.test(e.target.value)) {
      setIsUsableRePassword(true);
    } else {
      setIsUsableRePassword(false);
    }
  }

  return (
    <>
      <Container p={{ base: 0 }} px={{ base: 0, md: "1rem" }}>
        <Container p={0} px={{ base: 0, md: "1rem" }}>
          <form>
            <FormControl isRequired>
              <FormLabel mb="8px" fontSize="xs" as="b">
                ?????????
              </FormLabel>
              <InputGroup size="md">
                <Input
                  name="email"
                  id="email"
                  placeholder="???????????? ??????????????????"
                  fontSize="xs"
                  autoComplete="on"
                  focusBorderColor="green.600"
                  value={email}
                  onChange={(e) => handleEmailChange(e)}
                  isRequired={true}
                />
                <Flex>
                  <InputRightElement
                    children={
                      <CheckIcon
                        color="green.500"
                        transition="opacity ease-out 1s"
                        opacity={isNotExistEmail ? 1 : 0}
                        visibility={isNotExistEmail ? "visible" : "hidden"}
                      />
                    }
                    mr="4rem"
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" fontSize="0.7rem" onClick={handleEmailAlreadyExisit} disabled={!isUsableEmail}>
                      ????????????
                    </Button>
                  </InputRightElement>
                </Flex>
              </InputGroup>
            </FormControl>
            <FormControl mt="1rem" isRequired>
              <FormLabel mb="8px" fontSize="xs" as="b">
                ?????????
              </FormLabel>
              <InputGroup size="md">
                <Input
                  name="nickname"
                  id="nickname"
                  placeholder="???????????? ??????????????????"
                  fontSize="xs"
                  value={nickname}
                  focusBorderColor="green.600"
                  onChange={(e) => handleNicknameChange(e)}
                />

                <InputRightElement
                  children={
                    <CheckIcon
                      color="green.500"
                      transition="opacity ease-out 1s"
                      opacity={isUsableNickname ? 1 : 0}
                      visibility={isUsableNickname ? "visible" : "hidden"}
                    />
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl mt="1rem" isRequired>
              <FormLabel mb="8px" fontSize="xs" as="b">
                ????????????
              </FormLabel>
              <InputGroup size="md">
                <Input
                  name="password"
                  id="password"
                  placeholder="??????????????? ??????????????????"
                  type={isShowPassword ? "text" : "password"}
                  fontSize="xs"
                  value={password}
                  autoComplete="on"
                  onChange={(e) => handlePasswordChange(e)}
                  focusBorderColor="green.600"
                />
                <Flex>
                  <InputRightElement
                    children={
                      <CheckIcon
                        color="green.500"
                        transition="opacity ease-out 1s"
                        opacity={isUsablePassword ? 1 : 0}
                        visibility={isUsablePassword ? "visible" : "hidden"}
                      />
                    }
                    mr="4rem"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" fontSize="0.7rem" onClick={() => setIsShowPassword(!isShowPassword)}>
                      {isShowPassword ? "?????????" : "??????"}
                    </Button>
                  </InputRightElement>
                </Flex>
              </InputGroup>
              <InputGroup size="md" mt="0.5rem">
                <Input
                  placeholder="??????????????? ??? ??? ??? ??????????????????"
                  name="repassword"
                  id="repassword"
                  type="password"
                  fontSize="xs"
                  autoComplete="on"
                  value={rePassword}
                  onChange={(e) => handleRePasswordChange(e)}
                  focusBorderColor="green.600"
                />

                <InputRightElement
                  children={
                    <CheckIcon
                      color="green.500"
                      transition="opacity ease-out 1s"
                      opacity={isUsableRePassword && password === rePassword ? 1 : 0}
                      visibility={isUsableRePassword && password === rePassword ? "visible" : "hidden"}
                    />
                  }
                />
              </InputGroup>
            </FormControl>
            <FormControl mt="2rem">
              <Checkbox colorScheme="green" onChange={(e) => setIsAgree(e.target.checked)}>
                <Text fontSize="xs">
                  <Link to="/ss">
                    <span style={{ textDecoration: "underline" }}>????????????</span>
                  </Link>{" "}
                  ??????
                </Text>
              </Checkbox>
            </FormControl>
            <Button
              mt="1.5rem"
              colorScheme="green"
              variant="solid"
              w="100%"
              disabled={!isAgree || !isUsableNickname || !isNotExistEmail || !isUsableRePassword}
              isLoading={isLoading}
              onClick={handleSignUp}
            >
              ????????????
            </Button>
          </form>
        </Container>

        <Flex h="3.5rem" justify="center" gap="1rem" mt="4rem" flexDirection="column">
          <Box textAlign="center">
            <Text fontSize="xs" as="b">
              ?????? ???????????? ??????????????????
            </Text>
          </Box>
          <Flex justify="space-around">
            <Flex direction="column" alignItems="center" onClick={() => handleSocialSignup("kakao")}>
              <Image src={KaKao} h="3rem" />
              <Text fontSize="xs">Kakao</Text>
            </Flex>
            <Flex direction="column" alignItems="center" onClick={() => handleSocialSignup("google")}>
              <Image src={Google} h="3rem" />
              <Text fontSize="xs">Google</Text>
            </Flex>
            <Flex direction="column" alignItems="center" onClick={() => handleSocialSignup("naver")}>
              <Image src={Naver} h="3rem" />
              <Text fontSize="xs">Naver</Text>
            </Flex>
          </Flex>
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxW="30rem">
          <ModalHeader>???????????? ??????</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            ????????????
            <br />
            ???????????? ???????????? ????????? ??????????????????.
            <br />
            1?????? ????????? ????????? ??????????????????.
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={onClose}>
              ??????
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Signup;
