import { userState } from "@Features/user/states/user";
import Layout from "@Shared/layout/Layout";
import { Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";

function Main() {
  const [user, setUser] = useRecoilState(userState);
  if (user.id !== 0 && user.type === null) {
    return <Navigate to="/user/type" />;
  }
  return (
    <Layout mode="default">
      <h1>hello world</h1>
    </Layout>
  );
}

export default Main;
