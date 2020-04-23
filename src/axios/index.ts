import axios from "axios";
const instance:any = axios.create({
  baseURL: "",
  timeout: 2000
});
instance.interceptors.request.use(
  (config:any) => {
    return config;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response:any) => {
    return response;
  },
  (error:any) => {
    return Promise.reject(error);
  }
);
export default instance;
