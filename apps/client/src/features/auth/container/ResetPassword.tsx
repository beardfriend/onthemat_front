import { Button, Container, Flex, FormControl, FormLabel, Input, InputGroup, Text, useToast } from "@chakra-ui/react";
import onthemat from "@Shared/api/onthemat";
import { AxiosError } from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { emailRegex } from "../../../utils/regex";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUsableEmail, setIsUsableEmail] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (emailRegex.test(e.target.value)) {
      setIsUsableEmail(true);
    } else {
      setIsUsableEmail(false);
    }
  }

  async function handleResetPassword() {
    setIsLoading(true);
    try {
      const res = await onthemat.ResetPassword(email);
      console.log(res);
      if (res.status === 202) {
        toast({
          status: "success",
          title: "성공적으로 발송됐습니다.",
          position: "top",
          duration: 1500,
        });

        setEmail("");
        setIsUsableEmail(false);
        navigate("/account/login");
      }
    } catch (err) {
      console.log(err);
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string; code: number };
      toast({
        status: "error",
        title: errorData.message,
        position: "top",
        duration: 1500,
      });
    }
    setIsLoading(false);
  }

  return (
    <Container
      p={0}
      px={{ base: 0, md: "1rem" }}
      background="white"
      width="100%"
      maxW="30rem"
      h="42rem"
      borderRadius={{ base: "1rem", md: "2rem" }}
      border="5px solid #E2E8F0"
    >
      <Container p={0} px={{ base: 0, md: "1rem" }} h="100%">
        <Flex direction="column" alignItems="center">
          <Text fontSize="xl" textAlign="center" mt="10rem">
            임시비밀번호 발급
          </Text>
          <Text fontSize="xs" textAlign="center" mt="1.5rem">
            임시비밀번호를 발급받을 이메일을 입력해 주세요. <br />
            입력된 메일로 자세한 안내를 보내드립니다.
          </Text>
        </Flex>
        <Flex mt="3rem" direction="column">
          <FormControl isRequired>
            <FormLabel mb="8px" fontSize="xs" as="b">
              이메일
            </FormLabel>
            <InputGroup size="md">
              <Input
                value={email}
                onChange={(e) => handleEmailChange(e)}
                placeholder="임시 비밀번호를 발급받을 이메일을 입력해주세요"
                fontSize="xs"
                focusBorderColor="green.600"
                type="email"
              />
            </InputGroup>
          </FormControl>
          <Button
            mt="1.5rem"
            colorScheme="green"
            variant="solid"
            w="100%"
            disabled={!isUsableEmail}
            isLoading={isLoading}
            onClick={handleResetPassword}
          >
            비밀번호 전송
          </Button>
        </Flex>
      </Container>

      <Flex h="3.5rem" justify="center" gap="1rem" mt="4rem" flexDirection="column"></Flex>
    </Container>
  );
}

export default ResetPassword;
