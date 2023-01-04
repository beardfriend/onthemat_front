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

  Logout(refreshToken, userId) {
    return this.axios().get(`/v1/auth/logout`, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      params: {
        userId,
      },
    });
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

  // Upload
  ImageUpload(purpose, file, token) {
    const form = new FormData();
    form.append("file", file);
    return this.axios().post(`/v1/upload/${purpose}`, form, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
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

  UpdateMe({ nickname, phoneNum }, token, id) {
    return this.axios().put(
      `/v1/user/${id}`,
      {
        nickname,
        phone_num: phoneNum,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // Academy

  CreateAcademy(
    { sigunguAdmCode, businessCode, name, callNumber, addressRoad, addressDetail, logoUrl },
    yogaIds,
    token
  ) {
    return this.axios().post(
      `/v1/academy`,
      {
        info: {
          sigunguAdmCode: sigunguAdmCode,
          businessCode: businessCode,
          name: name,
          callNumber: callNumber,
          addressRoad: addressRoad,
          addressDetail: addressDetail,
          logoUrl: logoUrl,
        },
        yogaIds: yogaIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  AcademyMe(token) {
    return this.axios().get(`/v1/academy/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  UpdateAcademy(
    { sigunguAdmCode, sigunguId, name, callNumber, addressRoad, addressDetail, logoUrl },
    yogaIds,
    token,
    id
  ) {
    return this.axios().put(
      `/v1/academy/${id}`,
      {
        info: {
          sigunguAdmCode: sigunguAdmCode,
          sigunguId: sigunguId,
          name: name,
          logoUrl: logoUrl,
          callNumber: callNumber,
          addressRoad: addressRoad,
          addressDetail: addressDetail,
        },
        yogaIds: yogaIds,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  // Yoga

  Recommendation(name) {
    return this.axios().get(`v1/yoga/recommendation`, {
      params: {
        name,
      },
    });
  }
}

export default new OnthematAPI();
