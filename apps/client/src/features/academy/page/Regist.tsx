import { CheckIcon } from "@chakra-ui/icons";
import ImageUploading from "react-images-uploading";
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
  Image,
} from "@chakra-ui/react";
import onthemat from "@Shared/api/onthemat";
import { AxiosError } from "axios";
import DaumPost from "@Shared/components/DaumPost";
import Layout from "@Shared/layout/Layout";
import Cookies from "js-cookie";
import React, { Fragment, useEffect, useState } from "react";

function Regist() {
  const [image, setImage] = React.useState<any>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [businessCode, setBusinessCode] = useState("");
  const [isUsableBusinessCode, setIsUsableBusinessCode] = useState(false);
  const [academyName, setAcademyName] = useState("");
  const [isUsableAcademyName, setIsUsableAcademyName] = useState(false);
  const [callNumber, setCallNumber] = useState("");
  const [isUsableCallNumber, setIsUsableCallNumber] = useState(false);
  const [addressRoad, setAddressRoad] = useState("");
  const [isUsableAddressRoad, setIsUsableAddressRoad] = useState(false);
  const [addressDetail, setAddressDetail] = useState("");

  const [sigunguCode, setSigunguCode] = useState("");
  const [recommendationName, setRecommendationName] = useState("");
  const [recommendationData, setRecommendationData] = useState([]);
  const [selectedYoga, setSelectedYoga] = useState<any>([]);
  const [isUsableYoga, setIsUseableYoga] = useState(false);
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const initialRef = React.useRef(null);

  const maxNumber = 10;

  const onChange = async (imageList, addUpdateIndex) => {
    const token = Cookies.get("accessToken");
    const res = await onthemat.ImageUpload("logo", imageList[addUpdateIndex].file, token);
    console.log(res);

    setImage([imageList[addUpdateIndex]]);
    setImageUrl(res.data.result);
  };

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

    // ??????????????? ????????? ????????? ?????????
    if (value.startsWith("02")) {
      // ?????? 02 ????????????
      result.push(value.substring(0, 2));
      restNumber = value.substring(2);
    } else if (value.startsWith("1")) {
      // ?????? ????????? ?????? ??????
      // 1xxx-yyyy
      restNumber = value;
    } else {
      // ????????? 3?????? ????????????
      // 0xx-yyyy-zzzz
      result.push(value.substring(0, 3));
      restNumber = value.substring(3);
    }

    if (restNumber.length === 7) {
      // 7????????? ????????? ?????? xxx-yyyy
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
  }

  async function handleRecommendation(e) {
    setRecommendationName(e.target.value);

    const { data } = await onthemat.Recommendation(e.target.value);
    setRecommendationData(data.result);
  }

  function handleYogaAdd(data) {
    const filterd = selectedYoga.filter((d) => d.id === data.id);
    if (filterd.length > 0) {
      toast({ status: "warning", title: "?????? ????????? ???????????????.", position: "top", duration: 1500 });
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

  useEffect(() => {
    if (selectedYoga.length > 0) {
      setIsUseableYoga(true);
    } else {
      setIsUseableYoga(false);
    }
  }, [selectedYoga]);

  async function handleAcademyCreate() {
    const token = Cookies.get("accessToken");
    const ids: number[] = [];
    selectedYoga.forEach((d: any) => {
      ids.push(d.id);
    });

    try {
      const res = await onthemat.CreateAcademy(
        {
          sigunguAdmCode: Number(sigunguCode),
          businessCode: businessCode.replace(/-/g, ""),
          addressRoad: addressRoad,
          addressDetail: addressDetail,
          callNumber: callNumber.replace(/-/g, ""),
          name: academyName,
          logoUrl: imageUrl,
        },
        ids,
        token
      );
      if (res.status === 201) {
        window.location.href = "http://localhost:3000";
      }
    } catch (err) {
      const error = err as AxiosError;
      const errorData = error.response?.data as { message: string; code: number; details: string };
      toast({
        status: "error",
        title: errorData.message,
        position: "top",
        duration: 1500,
      });
    }
  }

  return (
    <Fragment>
      <Layout mode="default">
        <Flex minH="inherit" direction="column" align="center" bg="#1C241A">
          <Text textAlign="center" fontSize="2xl" fontWeight="bold" color="white">
            ?????? ?????? ??????
          </Text>
          <Container minH="50rem" background="white" borderRadius="2rem" mt="2rem" pt="2rem">
            <Container>
              <Text textAlign="center" fontSize="2xl" fontWeight="bold">
                ????????
              </Text>
              <form>
                <FormControl isRequired>
                  <FormLabel mb="8px" fontSize="xs" as="b">
                    ??????
                  </FormLabel>
                  <ImageUploading value={image} onChange={onChange} maxNumber={maxNumber} dataURLKey="data_url">
                    {({ onImageUpload }) => (
                      <>
                        {image.length === 0 ? (
                          <Image
                            src="https://www.svgrepo.com/show/170952/add-button.svg"
                            alt="Dan Abramov"
                            boxSize="100px"
                            onClick={onImageUpload}
                            cursor="pointer"
                          />
                        ) : (
                          <Image
                            boxSize="100px"
                            src={image[0]?.data_url}
                            alt="Dan Abramov"
                            onClick={onImageUpload}
                            cursor="pointer"
                          />
                        )}
                      </>
                    )}
                  </ImageUploading>
                </FormControl>

                <FormControl mt="1rem" isRequired>
                  <FormLabel mb="8px" fontSize="xs" as="b">
                    ????????? ??????
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      name="businessCode"
                      id="businessCode"
                      inputMode="decimal"
                      maxLength={12}
                      placeholder="????????? ????????? ??????????????????"
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
                    ?????? ??????
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      name="nickname"
                      id="nickname"
                      placeholder="?????? ????????? ??????????????????"
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
                    ?????? ????????? ??????
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      name="nickname"
                      id="nickname"
                      placeholder="?????? ????????? ????????? ??????????????????"
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
                    ?????? ??????
                  </FormLabel>
                  <InputGroup size="md">
                    <Input
                      name="nickname"
                      id="nickname"
                      placeholder="????????? ??????????????????"
                      fontSize="xs"
                      onClick={onOpen}
                      value={addressRoad}
                      focusBorderColor="green.600"
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
                      placeholder="??????????????? ??????????????????"
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
                          opacity={addressDetail.length > 1 ? 1 : 0}
                          visibility={addressDetail.length > 1 ? "visible" : "hidden"}
                        />
                      }
                    />
                  </InputGroup>
                  <DaumPost onCompletePost={onCompletePost} isOpen={isOpen} onClose={onClose} />
                </FormControl>
                <FormControl mt="1rem" isRequired>
                  <FormLabel mb="8px" fontSize="xs" as="b">
                    ???????????? ??????
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
                        ???????????? ????????????.
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
                      ????????????
                    </Button>
                  </Box>

                  <Modal initialFocusRef={initialRef} isOpen={isSearchOpen} onClose={handleYogaSearchModalClose}>
                    <ModalOverlay />
                    <ModalContent maxW="40rem" h="10rem">
                      <ModalHeader>????????? ??????????????????</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody pb={6}>
                        <InputGroup size="md" mt="0.5rem">
                          <Input
                            ref={initialRef}
                            name="yoga"
                            id="yoga"
                            placeholder="?????? ????????? ??????????????????"
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
                <Button
                  mt="1.5rem"
                  colorScheme="green"
                  variant="solid"
                  w="100%"
                  isDisabled={
                    !isUsableBusinessCode || !isUsableAcademyName || !isUsableCallNumber || !isUsableAddressRoad
                  }
                  onClick={handleAcademyCreate}
                >
                  ????????????
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
