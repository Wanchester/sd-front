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
    sessionStart: string;
    sessionStop: string;
    teamName: string;
    duration: string;
  }[];
}

export interface Credential {
  username: string;
  password: string;
}
const apiMethods = {
  getCurrentPlayer: async () => {
    return axios
      .get(`/api/profile`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data as ProfileResponse);
  },
  getPlayer: async (userID: string) => {
    return axios
      .get(`/api/profile/${userID}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data as ProfileResponse);
  },
  postPlayer: async (player: Partial<ProfileResponse>) => {
    return axios
      .put(`/api/profile`, player)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },
  //log in log out system
  logIn: async (credential: Credential) => {
    return axios.post("/api/login", credential).then((response) => {
      if (response.status === 200) {
        // logged in successfully
        const username = response.data.username as string;
        return username;
      } else {
        // failed to log in
        const error = response.data.error as string;
        return error;
      }
    });
  },
  hasUserAlreadyLoggedIn: async () => {
    return axios.get("/api/login").then((response) => {
      if (response.status === 200) {
        // the user has logged in
        const loggedIn = response.data.loggedIn as string;
        return loggedIn;
      } else {
        // the user has not logged in
        return false;
      }
    });
  },
  logOut: async () => {
    return axios.post("/api/logout").then(() => {
      window.location.reload();
    });
  },
};

export default apiMethods;
