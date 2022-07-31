import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
const BASE_URL = "http://54.210.74.109/api";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Access-Origin"] = "*";

const apiMethods = {
  getPlayer: async (userID: string) => {
    return axios
      .get("/profile/p_jbk", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  },
};

export default apiMethods;
