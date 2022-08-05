import axios from "axios";

export interface ProfileResponse {
  username: string;
  name: string;
  email: string;
  dob: string;
  nationality: string;
  height: number;
  weight: number;
  role: "player" | "coach" | "admin";
  teams: string[];
  trainingSessions: {
    sessionName: string;
    sessionDate: string;
    sessionTime: string;
    teamName: string;
    duration: string;
  }[];
}

export interface Credential {
  username: string;
  password: string;
}
const apiMethods = {
  getPlayer: async (userID: string) => {
    return axios
      .get(`/api/profile/${userID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data as ProfileResponse);
  },
  postPlayer: async (player: ProfileResponse) => {
    return axios
      .post(`/api/profile/${player.username}`, JSON.stringify(player))
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },
  //log in log out system
  logIn: async (credetial: Credential) => {
    return axios
      .post("", JSON.stringify(credetial))
      .then((response) => {
        localStorage.setItem("username", response.data.username);
        localStorage.setItem("isLogin", "true");
      })
      .catch((err) => console.log(err));
  },
  logOut: () => {
    localStorage.setItem("isLogin", "false");
    localStorage.removeItem("userName");
  },
};

export default apiMethods;
