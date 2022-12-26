import axios from "axios";

class OnthematAPI {
  axios() {
    return axios.create({
      baseURL: process.env.NODE_ENV === "production" ? "http://13.125.48.238/api" : "http://localhost:8000/api",
    });
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
}

export default new OnthematAPI();
