import onthemat from "@Shared/api/onthemat";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

async function RequireUser({ children, redirect }) {
  const token = Cookies.get("accessToken");
  const res = await onthemat.GetMe(token);

  return res.status === 200 ? children : <Navigate to={redirect} />;
}

export default RequireUser;
