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

//tobe deleted
const dummyData: StatisticData = {
  "5C3EBE": {
    Velocity: [],
    Height: [],
    Distance: [["2022-09-02T02:00:00Z", 0]],
  },
  "6C3EBE": {
    Velocity: [],
    Height: [],
    Distance: [["2022-09-02T02:00:00Z", 0]],
  },
  Boucher: {
    Velocity: [],
    Height: [],
    Distance: [
      ["2022-09-02T02:00:00Z", 201.9142857142857],
      ["2022-09-02T03:00:00Z", 3722.7646782967554],
      ["2022-09-02T04:00:00Z", 3290.7622676579927],
      ["2022-09-02T05:00:00Z", 5759.22618629174],
    ],
  },
  F4E2BC: { Velocity: [], Height: [], Distance: [["2022-09-02T02:00:00Z", 0]] },
  Flynn: {
    Velocity: [],
    Height: [],
    Distance: [
      ["2022-09-02T02:00:00Z", 190.91017964071855],
      ["2022-09-02T03:00:00Z", 3208.9003345413994],
      ["2022-09-02T04:00:00Z", 2964.522083179978],
      ["2022-09-02T05:00:00Z", 5123.978949199722],
    ],
  },
  JD: {
    Velocity: [],
    Height: [],
    Distance: [
      ["2022-09-02T02:00:00Z", 178.33236994219652],
      ["2022-09-02T03:00:00Z", 3330.620882188721],
      ["2022-09-02T04:00:00Z", 2847.0568097705404],
      ["2022-09-02T05:00:00Z", 4715.666081049426],
    ],
  },
  Jbk: {
    Velocity: [],
    Height: [],
    Distance: [
      ["2022-08-17T03:00:00Z", 5.909090909090909],
      ["2022-08-17T04:00:00Z", 683.9524185068349],
      ["2022-08-17T05:00:00Z", 1264.99549950544],
      ["2022-08-17T06:00:00Z", 1389.0794444444443],
      ["2022-08-17T07:00:00Z", 2719.8413978494627],
    ],
  },
  "NO PLAYER": {
    Velocity: [],
    Height: [],
    Distance: [["2022-09-02T02:00:00Z", 1.2]],
  },
  Nolan: {
    Velocity: [
      ["2022-08-17T03:00:00Z", 0.02381818181818181],
      ["2022-08-17T04:00:00Z", 5.406163697752939],
      ["2022-08-17T05:00:00Z", 1.4188241216148194],
      ["2022-08-17T06:00:00Z", 1.612180381218038],
      ["2022-08-17T07:00:00Z", 1.6197465437788017],
    ],
    Height: [],
    Distance: [],
  },
  Silv: {
    Velocity: [],
    Height: [],
    Distance: [
      ["2022-09-02T02:00:00Z", 217.010101010101],
      ["2022-09-02T03:00:00Z", 3886.313271604938],
      ["2022-09-02T04:00:00Z", 3290.787795992714],
      ["2022-09-02T05:00:00Z", 5362.993596400139],
    ],
  },
};
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
    // return axios
    //   .post("/api/lineGraph", {
    //     sessions: ["NULL 17/4/22", "NULL 2/4/22"],
    //     teams: ["TeamBit", "Team3"],
    //     fields: ["Velocity", "Height", "Distance"],
    //     time_window: { every: "3600", func: "mean" },
    //   })
    //   .then((response) => response.data);
    return dummyData;
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
