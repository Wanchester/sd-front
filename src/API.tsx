import axios from "axios";

<<<<<<< HEAD
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

const apiMethods = {
  getPlayer: async (userID: string) => {
    return axios
      .get(`/api/profile/${userID}`, {
=======
const apiMethods = {
  getPlayer: async (userID: string) => {
    return axios
      .get("/api/profile/p_jbk", {
>>>>>>> f96e761a243e9d5550684b9df86dd975361bb23d
        headers: {
          "Content-Type": "application/json",
        },
      })
<<<<<<< HEAD
      .then((response) => response.data as ProfileResponse);
  },
  postPlayer: async (player: ProfileResponse) => {
    return axios
      .post(`/api/profile/${player.username}`, JSON.stringify(player))
      .then((response) => console.log(response))
=======
      .then((response) => console.log(response.data))
>>>>>>> f96e761a243e9d5550684b9df86dd975361bb23d
      .catch((err) => console.log(err));
  },
};

export default apiMethods;
