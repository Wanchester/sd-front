import axios from "axios";

const apiMethods = {
  getPlayer: async (userID: string) => {
    return axios
      .get("/api/profile/p_jbk", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  },
};

export default apiMethods;
