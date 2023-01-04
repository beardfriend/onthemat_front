import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import onthemat from "@Shared/api/onthemat";
import Cookies from "js-cookie";
import { Fragment, useEffect, useState } from "react";
import { useQuery } from "react-query";

function User() {
  const token = Cookies.get("accessToken");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditable, setIsEditable] = useState(false);
  const { data, isSuccess, isError, isLoading } = useQuery("me", () => onthemat.GetMe(token).then((res) => res.data));
  const toast = useToast();
  const [me, setMe] = useState<any>({
    id: 0,
    email: "",
    phoneNum: "",
    nickname: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setMe({
        ...me,
        id: data.result.id,
        phoneNum: data.result.phone_num,
        email: data.result.email,
        nickname: data.result.nickname,
      });
    }
  }, [isSuccess, isError]);

  async function handleSubmitButton() {
    if (!isEditable) {
      setIsEditable(true);
      return;
    }
    setIsEditable(false);

    const res = await onthemat.UpdateMe(
      {
        nickname: me.nickname,
        phoneNum: me.phoneNum,
      },
      token,
      me.id
    );

    if (res.status === 200) {
      const { data } = await onthemat.GetMe(token);
      setMe({
        ...me,
        id: data.result.id,
        phoneNum: data.result.phone_num,
        email: data.result.email,
        nickname: data.result.nickname,
      });
    }
  }

  function handleDataChange(e) {
    setMe({ ...me, [e.target.name]: e.target.value });
  }

  return (
    <Fragment>
      <Container minH="50rem" background="white" mt="2rem" p={0} px={{ base: 0, md: "1rem" }}>
        <form>
          <FormControl mt="1rem" isRequired>
            <FormLabel mb="8px" fontSize="xs" as="b">
              이메일
            </FormLabel>
            <InputGroup size="md">
              <Input
                borderColor="black"
                _hover={{
                  borderColor: "black",
                }}
                name="name"
                id="name"
                placeholder="이메일을 입력해주세요"
                fontSize="xs"
                value={me.email}
                isReadOnly={true}
                focusBorderColor="green.600"
              />
            </InputGroup>
          </FormControl>

          <FormControl mt="1rem" isRequired>
            <FormLabel mb="8px" fontSize="xs" as="b">
              닉네임
            </FormLabel>
            <InputGroup size="md">
              <Input
                borderWidth={isEditable ? "2px" : "1px"}
                borderColor="gray.700"
                _hover={{
                  borderColor: "gray.700",
                }}
                onChange={(e) => handleDataChange(e)}
                name="nickname"
                id="nickname"
                placeholder="닉네임을 입력해주세요"
                fontSize="xs"
                onClick={() => {
                  if (isEditable) {
                    onOpen();
                  }
                }}
                isReadOnly={!isEditable}
                value={me.nickname}
                focusBorderColor="green.600"
              />
            </InputGroup>
          </FormControl>

          <FormControl mt="1rem">
            <FormLabel mb="8px" fontSize="xs" as="b">
              휴대폰 번호
            </FormLabel>
            <InputGroup size="md">
              <Input
                borderWidth={isEditable ? "2px" : "1px"}
                onChange={(e) => handleDataChange(e)}
                borderColor="black"
                _hover={{
                  borderColor: "black",
                }}
                name="phoneNum"
                id="phoneNum"
                placeholder="휴대폰 번호를 입력해주세요"
                fontSize="xs"
                isReadOnly={!isEditable}
                value={me.phoneNum}
                focusBorderColor="green.600"
              />
            </InputGroup>
          </FormControl>

          <Button
            colorScheme={isEditable ? "red" : "green"}
            mt="1.5rem"
            variant="solid"
            w="100%"
            onClick={handleSubmitButton}
          >
            {isEditable ? "완료" : "수정하기"}
          </Button>
        </form>
      </Container>
    </Fragment>
  );
}

export default User;
