import axios from "axios";
import { Refresh, RefreshErrorHandler } from "../../utils/refresh";
class OnthematAPI {
  axios() {
    const api = axios.create({
      baseURL: process.env.NODE_ENV === "production" ? "http://13.125.48.238/api" : "http://localhost:8000/api",
    });
    api.interceptors.request.use(Refresh, RefreshErrorHandler);
    return api;
  }
  //AUTH
  CheckEmail(email) {
    return this.axios().get(`/v1/auth/check-email`, {
      params: {
        email,
      },
    });
  }
  Singup(data) {
    return this.axios().post(`/v1/auth/signup`, data);
  }
  Login(data) {
    return this.axios().post(`/v1/auth/login`, data);
  }

  SocialLogin(type) {
    return this.axios().get(`/v1/auth/${type}/url`, {
      headers: {
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  ResetPassword(email) {
    return this.axios().get(`/v1/auth/temp-password`, {
      params: {
        email,
      },
    });
  }

  RefreshToken(token) {
    return this.axios().get(`/v1/auth/token/refresh`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // User

  GetMe(token) {
    return this.axios().get(`/v1/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new OnthematAPI();
