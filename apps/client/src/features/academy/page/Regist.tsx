import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import onthemat from "@Shared/api/onthemat";
import DaumPost from "@Shared/components/DaumPost";
import Layout from "@Shared/layout/Layout";
import React, { Fragment, useState } from "react";

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
  const [sigunguCode, setSigunguCode] = useState("");
  const [recommendationName, setRecommendationName] = useState("");
  const [recommendationData, setRecommendationData] = useState([]);
  const [selectedYoga, setSelectedYoga] = useState<any>([]);
  const [isUsableYoga, setIsUseableYoga] = useState(false);
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const initialRef = React.useRef(null);

  function onCompletePost(data) {
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
    setSigunguCode(data.sigunguCode);
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

  async function handleRecommendation(e) {
    setRecommendationName(e.target.value);

    const { data } = await onthemat.Recommendation(e.target.value);
    setRecommendationData(data.result);
  }

  function handleYogaAdd(data) {
    const filterd = selectedYoga.filter((d) => d.id === data.id);
    if (filterd.length > 0) {
      toast({ status: "warning", title: "이미 등록된 요가입니다.", position: "top", duration: 1500 });
      return;
    }
    setSelectedYoga([...selectedYoga, { name: data.name, id: data.id }]);
  }

  function handleYogaRemove(data) {
    const filtred = selectedYoga.filter((d) => d.id !== data.id);
    setSelectedYoga(filtred);
  }

  function handleYogaSearchModalClose() {
    setRecommendationName("");
    setRecommendationData([]);
    onSearchClose();
  }

  return (
    <Fragment>
      <Layout mode="default">
        <Flex minH="inherit" direction="column" align="center" bg="#1C241A">
          <Text textAlign="center" fontSize="2xl" fontWeight="bold" color="white">
            학원 정보 등록
          </Text>
          <Container minH="50rem" background="white" borderRadius="2rem" mt="2rem" pt="2rem">
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
                <FormControl mt="1rem" isRequired>
                  <FormLabel mb="8px" fontSize="xs" as="b">
                    취급하는 요가
                  </FormLabel>
                  <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    height="4rem"
                    boxSizing="content-box"
                    pos="relative"
                    pt="0.9rem"
                  >
                    {selectedYoga.length === 0 ? (
                      <Text ml="1.5rem" fontSize="xs" color="gray.500">
                        데이터가 없습니다.
                      </Text>
                    ) : (
                      <Flex gap="0.5rem" wrap="wrap">
                        {selectedYoga?.map((d: any) => {
                          return (
                            <>
                              <HStack spacing={4}>
                                <Tag size="sm" key={d.id} borderRadius="full" variant="solid" colorScheme="green">
                                  <TagLabel>{d.name}</TagLabel>
                                  <TagCloseButton onClick={() => handleYogaRemove(d)} />
                                </Tag>
                              </HStack>
                            </>
                          );
                        })}
                      </Flex>
                    )}
                    <Button
                      pos="absolute"
                      right="0.4rem"
                      top="50%"
                      transform="translate(0, -50%)"
                      size="sm"
                      onClick={onSearchOpen}
                    >
                      검색하기
                    </Button>
                  </Box>

                  <Modal initialFocusRef={initialRef} isOpen={isSearchOpen} onClose={handleYogaSearchModalClose}>
                    <ModalOverlay />
                    <ModalContent maxW="40rem" h="10rem">
                      <ModalHeader>요가를 검색해주세요</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <InputGroup size="md" mt="0.5rem">
                          <Input
                            ref={initialRef}
                            name="yoga"
                            id="yoga"
                            placeholder="요가 종류를 입력해주세요"
                            fontSize="xs"
                            value={recommendationName}
                            onChange={(e) => handleRecommendation(e)}
                            focusBorderColor="green.600"
                          />
                        </InputGroup>
                        {recommendationData.length > 0 && (
                          <Flex
                            border="1px solid black"
                            direction="column"
                            alignItems="center"
                            pos="relative"
                            zIndex="2"
                            bg="white"
                          >
                            {recommendationData?.map((d: any) => {
                              return (
                                <>
                                  <Text
                                    key={d._id}
                                    borderBottom="1px solid gray"
                                    w="100%"
                                    pl="1rem"
                                    py="0.5rem"
                                    cursor="pointer"
                                    _hover={{
                                      background: "green.600",
                                    }}
                                    onClick={() => handleYogaAdd({ name: d._source.name, id: d._source.id })}
                                  >
                                    {d._source?.name}
                                  </Text>
                                </>
                              );
                            })}
                          </Flex>
                        )}
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </FormControl>
                <Button mt="1.5rem" colorScheme="green" variant="solid" w="100%">
                  등록하기
                </Button>
              </form>
            </Container>
          </Container>
        </Flex>
      </Layout>
    </Fragment>
  );
}

export default Regist;
