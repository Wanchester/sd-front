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
};

export default apiMethods;
