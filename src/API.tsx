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
export interface PlayerList {
  players: { name: string; username: string }[];
}
export interface TrainingSession {
  sessionName: string;
  sessionStart: string;
  sessionStop: string;
  teamName: string;
  duration: string;
}
export interface StatisticData {
  [playerName: string]: {
    [fieldName: string]: [string, number][];
  };
}

const apiMethods = {
  //player
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
  putPlayer: async (player: Partial<ProfileResponse>) => {
    return axios
      .put(`/api/profile`, player)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },
  //training session
  getTrainingSession: async (sessionName: string, teamName: string) => {
    return axios
      .get("/api/trainingSessions", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          fullStats: true,
          teamName: teamName,
          sessionName: sessionName,
        },
      })
      .then((response) => {
        return response.data as TrainingSession;
      });
  },
  getTeamTrainingSession: async (teamName: string | undefined) => {
    return axios
      .get("/api/trainingSessions", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          teamName: teamName,
        },
      })
      .then((response) => {
        return response.data as TrainingSession[];
      });
  },
  //team
  getTeam: async (team: string | undefined) => {
    return axios
      .get(`/api/team`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          teamName: team,
        },
      })
      .then((response) => response.data as PlayerList);
  },
  //statistic
  //for team
  //line graph
  getLineGraphStatistic: async () => {
    return axios
      .post("/api/lineGraph", {
        sessions: ["NULL 17/4/22", "NULL 2/4/22"],
        teams: ["TeamBit", "Team3"],
        fields: ["Velocity", "Height", "Distance"],
        time_window: { every: "3600", func: "mean" },
      })
      .then((response) => response.data as StatisticData);
  },

  //log in log out system
  logIn: async (credential: Credential): Promise<string | false> => {
    return axios.post("/api/login", credential).then(
      (response) => {
        // logged in successfully
        const username = response.data.username as string;
        return username;
      },
      () => {
        // failed to log in
        return false;
      }
    );
  },
  hasUserAlreadyLoggedIn: async (): Promise<string | false> => {
    return axios.get("/api/login").then(
      (response) => {
        // the user has logged in
        const loggedIn = response.data.loggedIn as string;
        return loggedIn;
      },
      () => {
        // the user has not logged in
        return false;
      }
    );
  },
  logOut: async () => {
    return axios.post("/api/logout").then(
      () => {
        window.location.reload();
      },
      () => {}
    );
  },
};

export default apiMethods;
