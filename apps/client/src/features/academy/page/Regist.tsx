import { CheckIcon } from "@chakra-ui/icons";
import {
  Text,
  Flex,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import DaumPost from "@Shared/components/DaumPost";
import Layout from "@Shared/layout/Layout";
import React, { useState } from "react";

function Regist() {
  const [businessCode, setBusinessCode] = useState("");
  const [isUsableBusinessCode, setIsUsableBusinessCode] = useState(false);
  const [academyName, setAcademyName] = useState("");
  const [isUsableAcademyName, setIsUsableAcademyName] = useState(false);
  const [callNumber, setCallNumber] = useState("");
  const [isUsableCallNumber, setIsUsableCallNumber] = useState(false);
  const [addressRoad, setAddressRoad] = useState("");
  const [isUsableAddressRoad, setIsUsableAddressRoad] = useState(false);
  const [addressDetail, setAddressDetail] = useState("");
  const [isUsableAddressDetail, setIsUsableAddressDetail] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  function onCompletePost(data) {
    console.log(data.sido); // 서울
    console.log(data.sigungu); // 시군구

    let fullAddr = data.address;
    let extraAddr = "";
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    setAddressRoad(fullAddr);
    onClose();
    setIsUsableAddressRoad(true);
  }

  function callNumberHypen(value: string) {
    if (!value) {
      return "";
    }
    value = value.replace(/[^0-9]/g, "");
    let result: string[] = [];
    let restNumber = "";

    // 지역번호와 나머지 번호로 나누기
    if (value.startsWith("02")) {
      // 서울 02 지역번호
      result.push(value.substring(0, 2));
      restNumber = value.substring(2);
    } else if (value.startsWith("1")) {
      // 지역 번호가 없는 경우
      // 1xxx-yyyy
      restNumber = value;
    } else {
      // 나머지 3자리 지역번호
      // 0xx-yyyy-zzzz
      result.push(value.substring(0, 3));
      restNumber = value.substring(3);
    }

    if (restNumber.length === 7) {
      // 7자리만 남았을 때는 xxx-yyyy
      result.push(restNumber.substring(0, 3));
      result.push(restNumber.substring(3));
    } else {
      result.push(restNumber.substring(0, 4));
      result.push(restNumber.substring(4));
    }

    return result.filter((val) => val).join("-");
  }

  function handleBusinessCodeChange(e) {
    setBusinessCode(
      e.target.value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,2})(\d{0,5})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "")
    );

    if (e.target.value.length === 12) {
      setIsUsableBusinessCode(true);
    } else {
      setIsUsableBusinessCode(false);
    }
  }

  function handleAcademyNameChange(e) {
    setAcademyName(e.target.value);

    if (e.target.value.length > 1) {
      setIsUsableAcademyName(true);
    } else {
      setIsUsableAcademyName(false);
    }
  }

  function handleCallNumberChange(e) {
    setCallNumber(callNumberHypen(e.target.value));
    if (e.target.value.length > 7) {
      setIsUsableCallNumber(true);
    } else {
      setIsUsableCallNumber(false);
    }
  }

  function handleDetailAddress(e) {
    setAddressDetail(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 20) {
      setIsUsableAddressDetail(false);
    } else {
      setIsUsableAddressDetail(true);
    }
  }

  return (
    <Layout mode="default">
      <Flex minH="inherit" direction="column" align="center" bg="#1C241A">
        <Text textAlign="center" fontSize="2xl" fontWeight="bold" color="white">
          학원 정보 등록
        </Text>
        <Container h="40rem" background="white" borderRadius="2rem" mt="2rem">
          <Container>
            <Text textAlign="center" fontSize="2xl" fontWeight="bold">
              🙏🏽
            </Text>
            <form>
              <FormControl mt="1rem" isRequired>
                <FormLabel mb="8px" fontSize="xs" as="b">
                  사업자 번호
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    name="businessCode"
                    id="businessCode"
                    inputMode="decimal"
                    maxLength={12}
                    placeholder="사업자 번호를 입력해주세요"
                    fontSize="xs"
                    value={businessCode}
                    focusBorderColor="green.600"
                    onChange={(e) => handleBusinessCodeChange(e)}
                  />

                  <InputRightElement
                    children={
                      <CheckIcon
                        color="green.500"
                        transition="opacity ease-out 1s"
                        opacity={isUsableBusinessCode ? 1 : 0}
                        visibility={isUsableBusinessCode ? "visible" : "hidden"}
                      />
                    }
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt="1rem" isRequired>
                <FormLabel mb="8px" fontSize="xs" as="b">
                  학원 이름
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    name="nickname"
                    id="nickname"
                    placeholder="학원 이름을 입력해주세요"
                    fontSize="xs"
                    value={academyName}
                    focusBorderColor="green.600"
                    onChange={(e) => handleAcademyNameChange(e)}
                  />
                  <InputRightElement
                    children={
                      <CheckIcon
                        color="green.500"
                        transition="opacity ease-out 1s"
                        opacity={isUsableAcademyName ? 1 : 0}
                        visibility={isUsableAcademyName ? "visible" : "hidden"}
                      />
                    }
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt="1rem" isRequired>
                <FormLabel mb="8px" fontSize="xs" as="b">
                  연락 가능한 번호
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    name="nickname"
                    id="nickname"
                    placeholder="연락 가능한 번호를 입력해주세요"
                    fontSize="xs"
                    value={callNumber}
                    maxLength={13}
                    focusBorderColor="green.600"
                    onChange={(e) => handleCallNumberChange(e)}
                  />
                  <InputRightElement
                    children={
                      <CheckIcon
                        color="green.500"
                        transition="opacity ease-out 1s"
                        opacity={isUsableCallNumber ? 1 : 0}
                        visibility={isUsableCallNumber ? "visible" : "hidden"}
                      />
                    }
                  />
                </InputGroup>
              </FormControl>

              <FormControl mt="1rem" isRequired>
                <FormLabel mb="8px" fontSize="xs" as="b">
                  학원 주소
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    name="nickname"
                    id="nickname"
                    placeholder="주소를 입력해주세요"
                    fontSize="xs"
                    onClick={onOpen}
                    value={addressRoad}
                    focusBorderColor="green.600"
                    onChange={(e) => handleCallNumberChange(e)}
                  />
                  <InputRightElement
                    children={
                      <CheckIcon
                        color="green.500"
                        transition="opacity ease-out 1s"
                        opacity={isUsableAddressRoad ? 1 : 0}
                        visibility={isUsableAddressRoad ? "visible" : "hidden"}
                      />
                    }
                  />
                </InputGroup>
                <InputGroup size="md" mt="0.5rem">
                  <Input
                    name="nickname"
                    id="nickname"
                    placeholder="상세주소를 입력해주세요"
                    fontSize="xs"
                    value={addressDetail}
                    onChange={(e) => handleDetailAddress(e)}
                    focusBorderColor="green.600"
                  />
                  <InputRightElement
                    children={
                      <CheckIcon
                        color="green.500"
                        transition="opacity ease-out 1s"
                        opacity={isUsableAddressDetail ? 1 : 0}
                        visibility={isUsableAddressDetail ? "visible" : "hidden"}
                      />
                    }
                  />
                </InputGroup>

                <DaumPost onCompletePost={onCompletePost} isOpen={isOpen} onClose={onClose} />
              </FormControl>
            </form>
          </Container>
        </Container>
      </Flex>
    </Layout>
  );
}

export default Regist;
