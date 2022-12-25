import { Box, Input, InputGroup, Text } from "@chakra-ui/react";

function EmailBox({ value, onChange }) {
  return (
    <Box>
      <Text mb="8px" fontSize="xs" as="b">
        이메일
      </Text>
      <InputGroup size="md">
        <Input
          placeholder="이메일을 입력해주세요"
          fontSize="xs"
          focusBorderColor="green.600"
          type="email"
          value={value}
          onChange={onChange}
        />
      </InputGroup>
    </Box>
  );
}

export default EmailBox;
