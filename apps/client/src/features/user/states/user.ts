import { atom } from "recoil";

export const userState = atom({
  key: "user", // unique ID (with respect to other atoms/selectors)
  default: {
    id: 0,
    email: null,
    nickname: "",
    type: null,
  }, // default value (aka initial value)
});

export const loginTypeState = atom({
  key: "loginType",
  default: "non",
});
