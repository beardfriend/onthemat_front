import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

export async function Refresh(config: AxiosRequestConfig) {
  const access = Cookies.get("accessToken");
  const refresh = Cookies.get("refreshToken");

  if (access === undefined && refresh) {
    const { data } = await axios.get(`http://localhost:8000/api/v1/auth/token/refresh`, {
      headers: {
        Authorization: `Bearer ${refresh}`,
      },
    });
    Cookies.set("accessToken", data.result.accessToken, { expires: 20000 });
    config.headers = {
      Authorization: `Bearer ${data.result.accessToken}`,
    };
  }

  return config;
}

export function RefreshErrorHandler() {
  Cookies.remove("refreshToken");
}
