import { request } from "./api";

const getUserInfo = (props: object) => {
  const requestProps = {
    method: "GET",
    url: "/users/myInfo",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

const makeUser = (props: object) => {
  const requestProps = {
    method: "POST",
    url: "/users",
    data: props,
  };
  const res = request(requestProps);
  return res;
};

export { getUserInfo, makeUser };
