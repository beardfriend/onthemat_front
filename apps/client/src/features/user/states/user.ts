import { atom } from "recoil";

export const userState = atom({
  key: "user", // unique ID (with respect to other atoms/selectors)
  default: {
    id: 0,
    email: null,
    nickname: "",
    type: null,
    logo_url: "https://pbs.twimg.com/profile_images/1374979417915547648/vKspl9Et_400x400.jpg",
  }, // default value (aka initial value)
});

export const loginTypeState = atom({
  key: "loginType",
  default: "non",
});
