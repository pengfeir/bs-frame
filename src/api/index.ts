import axios from "@/axios";
export const demo = (data: any) => {
  return axios({
    url: "/mock/menu",
    method: "post",
    data,
  });
};
