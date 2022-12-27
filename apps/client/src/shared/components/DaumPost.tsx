import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import DaumPostcode from "react-daum-postcode";
import React from "react";

function DaumPost({ onClose, isOpen, onCompletePost }) {
  return (
    <Modal onClose={onClose} size="xl" isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent w={{ base: "100%", md: "40%" }}>
        <ModalHeader fontSize="xs">주소입력</ModalHeader>
        <ModalCloseButton />
        <ModalBody py="0" px="0.2rem">
          <DaumPostcode autoClose onComplete={onCompletePost} />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DaumPost;
