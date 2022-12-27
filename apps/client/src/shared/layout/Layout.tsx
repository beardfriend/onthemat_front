import { calc, Container } from "@chakra-ui/react";
import { userState } from "@Features/user/states/user";
import onthemat from "@Shared/api/onthemat";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";

import Header from "./header/Header";

interface ILayout {
  children: React.ReactNode;
  mode: string;
}

function Layout({ children, mode }: ILayout) {
  const token = Cookies.get("accessToken");
  const { data, isSuccess, isError } = useQuery("me", () => onthemat.GetMe(token).then((res) => res.data), {
    retry: 0,
  });
  const [user, setUser] = useRecoilState(userState);
  const reset = useResetRecoilState(userState);

  useEffect(() => {
    if (isSuccess) {
      setUser(data.result);
    }
    if (isError) {
      reset();
    }
  }, [isSuccess, isError]);

  return (
    <Container w="100%" maxW="100%" m="0" p="0">
      <Header
        mode={mode}
        loginType={!data?.result ? "non" : data?.result?.type !== null ? data?.result?.type : "user"}
        logoUrl="https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg"
      />
      <Container
        w={"100%"}
        maxW={mode === "auth" ? "100%" : "xl"}
        minH={{ base: "calc(100vh - 3.5rem)", md: "calc(100vh - 4rem)" }}
        mt={{ base: "3.5rem", md: "4rem" }}
        p="0"
      >
        {children}
      </Container>
    </Container>
  );
}

export default Layout;

Layout.defaultProps = {
  mode: "auth",
};
