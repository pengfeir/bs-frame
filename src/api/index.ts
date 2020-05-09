import axios from "@/axios";
export const demo = (data: any) => {
  return axios({
    url: "/mock/menu",
    method: "post",
    data,
  });
};
export const getOption = (data: any) => {
  return axios({
    url: "/mock/formselect",
    method: "post",
    data,
  });
};
