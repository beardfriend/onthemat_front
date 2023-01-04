import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
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
import Cookies from "js-cookie";
import React, { Fragment, useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useQuery } from "react-query";

function Me() {
  const token = Cookies.get("accessToken");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditable, setIsEditable] = useState(false);
  const { data, isSuccess, isError, isLoading } = useQuery("academyMe", () =>
    onthemat.AcademyMe(token).then((res) => res.data)
  );
  const { isOpen: isSearchOpen, onOpen: onSearchOpen, onClose: onSearchClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const [recommendationName, setRecommendationName] = useState("");
  const [recommendationData, setRecommendationData] = useState([]);
  const toast = useToast();
  const [image, setImage] = React.useState<any>([]);

  const [academy, setAcademy] = useState<any>({
    id: 0,
    logoUrl: "",
    addressRoad: "",
    addressDetail: "",
    sigunguId: 0,
    sigunguAdmCode: 0,
    addressSigun: "",
    callNumber: "",
    name: "",
    yoga: [{ index: 0, id: 0, nameKor: "" }],
  });
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

    setAcademy({ ...academy, addressRoad: fullAddr, sigunguAdmCode: data.sigunguCode });
    onClose();
  }
  useEffect(() => {
    if (isSuccess) {
      setAcademy({
        ...academy,
        id: data.result.id,
        sigunguId: data.result.sigunguId,
        logoUrl: data.result.logoUrl,
        callNumber: data.result.callNumber,
        addressRoad: data.result.addressRoad,
        addressDetail: data.result.addressDetail,
        addressSigun: "",
        name: data.result.name,
        yoga: [...data.result.yoga],
      });
    }
  }, [isSuccess, isError]);

  async function handleSubmitButton() {
    if (!isEditable) {
      setIsEditable(true);
      return;
    }
    setIsEditable(false);
    const ids: number[] = [];
    academy.yoga.forEach((d: any) => {
      ids.push(d.id);
    });
    const res = await onthemat.UpdateAcademy(
      {
        addressDetail: academy.addressDetail,
        name: academy.name,
        addressRoad: academy.addressRoad,
        callNumber: academy.callNumber,
        logoUrl: academy.logoUrl,
        sigunguAdmCode: Number(academy.sigunguAdmCode),
        sigunguId: Number(academy.sigunguId),
      },
      ids,
      token,
      academy.id
    );

    if (res.status === 200) {
      const { data } = await onthemat.AcademyMe(token);
      setAcademy({
        ...academy,
        id: data.result.id,
        sigunguId: data.result.sigunguId,
        logoUrl: data.result.logoUrl,
        callNumber: data.result.callNumber,
        addressRoad: data.result.addressRoad,
        addressDetail: data.result.addressDetail,
        addressSigun: "",
        name: data.result.name,
        yoga: [...data.result.yoga],
      });
    }
  }

  function handleDataChange(e) {
    switch (e.target.name) {
      case "name":
        setAcademy({ ...academy, name: e.target.value });
        break;
      case "detail":
        setAcademy({ ...academy, addressDetail: e.target.value });
        break;
      case "callNumber":
        setAcademy({ ...academy, callNumber: e.target.value });
        break;
      default:
        console.log(e.target.value);
        console.log(e);
        break;
    }
  }

  function handleYogaSearchModalClose() {
    setRecommendationName("");
    setRecommendationData([]);
    onSearchClose();
  }

  function handleYogaAdd(data) {
    console.log(data);
    const filterd = academy.yoga.filter((d) => d.id === data._source?.id);
    if (filterd.length > 0) {
      toast({ status: "warning", title: "이미 등록된 요가입니다.", position: "top", duration: 1500 });
      return;
    }
    const newData = { nameKor: data._source?.name, id: data._source?.id };
    setAcademy({ ...academy, yoga: [...academy.yoga, ...[newData]] });
  }

  function handleYogaRemove(data) {
    const filtred = academy.yoga.filter((d) => d.id !== data.id);
    setAcademy({ ...academy, yoga: filtred });
  }

  async function handleRecommendation(e) {
    setRecommendationName(e.target.value);

    const { data } = await onthemat.Recommendation(e.target.value);
    setRecommendationData(data.result);
  }

  const onChange = async (imageList, addUpdateIndex) => {
    const token = Cookies.get("accessToken");
    const res = await onthemat.ImageUpload("logo", imageList[addUpdateIndex].file, token);
    setImage([imageList[addUpdateIndex]]);
    setAcademy({ ...academy, logoUrl: res.data.result });

    const ids: number[] = [];
    academy.yoga.forEach((d: any) => {
      ids.push(d.id);
    });

    const res2 = await onthemat.UpdateAcademy(
      {
        addressDetail: academy.addressDetail,
        name: academy.name,
        addressRoad: academy.addressRoad,
        callNumber: academy.callNumber,
        logoUrl: res.data.result,
        sigunguAdmCode: Number(academy.sigunguAdmCode),
        sigunguId: Number(academy.sigunguId),
      },
      ids,
      token,
      academy.id
    );

    if (res2.status === 200) {
      const { data } = await onthemat.AcademyMe(token);
      setAcademy({
        ...academy,
        id: data.result.id,
        sigunguId: data.result.sigunguId,
        logoUrl: data.result.logoUrl,
        callNumber: data.result.callNumber,
        addressRoad: data.result.addressRoad,
        addressDetail: data.result.addressDetail,
        addressSigun: "",
        name: data.result.name,
        yoga: [...data.result.yoga],
      });
    }
  };

  return (
    <Fragment>
      <Container minH="50rem" background="white" mt="2rem" p={0} px={{ base: 0, md: "1rem" }}>
        <form>
          <Flex direction="column" justify="center" align="center">
            <ImageUploading value={image} onChange={onChange} maxNumber={10} dataURLKey="data_url">
              {({ onImageUpload }) => (
                <>
                  <Image src={academy.logoUrl} boxSize="200px" />
                  <Flex mt="2rem" gap="1.5rem">
                    <Button size="xs" colorScheme="green" onClick={onImageUpload}>
                      이미지 업로드
                    </Button>
                  </Flex>
                </>
              )}
            </ImageUploading>
          </Flex>

          <FormControl mt="1rem" isRequired>
            <FormLabel mb="8px" fontSize="xs" as="b">
              학원 이름
            </FormLabel>
            <InputGroup size="md">
              <Input
                borderColor="black"
                _hover={{
                  borderColor: "black",
                }}
                borderWidth={isEditable ? "2px" : "1px"}
                name="name"
                id="name"
                placeholder="학원 이름을 입력해주세요"
                fontSize="xs"
                value={academy.name}
                onChange={(e) => handleDataChange(e)}
                isReadOnly={!isEditable}
                focusBorderColor="green.600"
              />
            </InputGroup>
          </FormControl>

          <FormControl mt="1rem" isRequired>
            <FormLabel mb="8px" fontSize="xs" as="b">
              학원 주소
            </FormLabel>
            <InputGroup size="md">
              <Input
                borderColor="gray.700"
                _hover={{
                  borderColor: "gray.700",
                }}
                name="address"
                id="address"
                borderWidth={isEditable ? "2px" : "1px"}
                placeholder="학원 주소를"
                fontSize="xs"
                onClick={() => {
                  if (isEditable) {
                    onOpen();
                  }
                }}
                isReadOnly={!isEditable}
                value={academy.addressRoad}
                focusBorderColor="green.600"
              />
            </InputGroup>
            <InputGroup size="md" mt="0.5rem">
              <Input
                borderColor={"black"}
                _hover={{
                  borderColor: "black",
                }}
                borderWidth={isEditable ? "2px" : "1px"}
                name="detail"
                id="detail"
                placeholder="상세주소를 입력해주세요"
                fontSize="xs"
                onChange={(e) => handleDataChange(e)}
                value={academy.addressDetail}
                isReadOnly={!isEditable}
                focusBorderColor="green.600"
              />
              <InputRightElement
                children={
                  <CheckIcon
                    color="green.500"
                    transition="opacity ease-out 1s"
                    opacity={isEditable && academy.addressDetail.length > 1 ? 1 : 0}
                    visibility={academy.addressDetail.length > 1 ? "visible" : "hidden"}
                  />
                }
              />
            </InputGroup>
            <DaumPost onCompletePost={onCompletePost} isOpen={isOpen} onClose={onClose} />
          </FormControl>

          <FormControl mt="1rem" isRequired>
            <FormLabel mb="8px" fontSize="xs" as="b">
              학원 연락처
            </FormLabel>
            <InputGroup size="md">
              <Input
                borderColor="black"
                _hover={{
                  borderColor: "black",
                }}
                borderWidth={isEditable ? "2px" : "1px"}
                name="callNumber"
                id="callNumber"
                fontSize="xs"
                onChange={(e) => handleDataChange(e)}
                isReadOnly={!isEditable}
                value={academy.callNumber}
                focusBorderColor="green.600"
              />
            </InputGroup>
          </FormControl>

          <FormControl mt="1rem" isRequired>
            <FormLabel mb="8px" fontSize="xs" as="b">
              취급하는 요가
            </FormLabel>
            <Box
              borderWidth={isEditable ? "2px" : "1px"}
              borderRadius="lg"
              height="4rem"
              boxSizing="content-box"
              pos="relative"
              pt="0.9rem"
              borderColor="black"
              _hover={{
                borderColor: "black",
              }}
            >
              {academy.yoga.length === 0 ? (
                <Text ml="1.5rem" fontSize="xs" color="gray.500">
                  데이터가 없습니다.
                </Text>
              ) : (
                <Flex gap="0.5rem" wrap="wrap">
                  {academy.yoga?.map((d: any) => {
                    return (
                      <>
                        <HStack spacing={4}>
                          <Tag size="sm" key={d.id} borderRadius="full" variant="solid" colorScheme="green">
                            <TagLabel>{d.nameKor}</TagLabel>
                            {isEditable && (
                              <TagCloseButton onClick={() => handleYogaRemove(d)} isDisabled={!isEditable} />
                            )}
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
                isDisabled={!isEditable}
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
                              onClick={() => handleYogaAdd(d)}
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
            colorScheme={isEditable ? "red" : "green"}
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

export default Me;
