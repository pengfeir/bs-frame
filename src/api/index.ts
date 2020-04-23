import axios from "@/axios"
export const demo = (data:any) => {
  return axios({
    url: "/api/menu",
    method: "post",
    data
  });
};
