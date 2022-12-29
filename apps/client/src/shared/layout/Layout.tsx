import { Container } from "@chakra-ui/react";
import { userState } from "@Features/user/states/user";
import onthemat from "@Shared/api/onthemat";
import Cookies from "js-cookie";
import { Fragment, useEffect } from "react";
import { useQuery } from "react-query";
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

  async function handleLogout() {
    const refreshToken = Cookies.get("refreshToken");
    try {
      await onthemat.Logout(refreshToken, user.id);
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      window.location.href = "http://localhost:3000/";
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setUser(data.result);
    }
    if (isError) {
      reset();
    }
  }, [isSuccess, isError]);

  return (
    <Fragment>
      <Container w="100%" maxW="100%" m="0" p="0">
        <Header
          mode={mode}
          handleLogout={handleLogout}
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
    </Fragment>
  );
}

export default Layout;

Layout.defaultProps = {
  mode: "auth",
};
