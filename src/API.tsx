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
export type InfluxColumn = "teams" | "sessions" | "players";
export type AggregateFunc =
  | "mean"
  | "median"
  | "mode"
  | "max"
  | "min"
  | "timedMovingAverage";
const influxFields = [
  "2dAccuracy", //gps accuracy in mm
  "3dAccuracy",
  "lat",
  "lon", //gps coordinates in degrees * 10^6
  "Velocity", //speed in m/s
  //reset at haltime
  "Distance", //travel distance in m
  "Height", //height in m?
  "Run Distance", //distance travelled over 4.5m/s in m
  "Sprint Distance", //distance travelled over 6m/s in m
  "Work Rate", //Distance / time as m/min
  //reset at start of session
  "Total Distance",
  "Total Run Distance",
  "Total Sprint Distance",
  "Total WorkRate",
] as const;
export type InfluxField = typeof influxFields[number];


export interface StatisticData {
  [playerName: string]: {
    //these are InfluxFields
    [fieldName: string]: [string, number][];
  };
}
export interface LineGraphQuery {
  fields: typeof influxFields[number][];
  names?: string[];
  sessions?: string[];
  teams?: string[];
  aggregate?: {
    //how often is there a new window?
    every?: number; //in seconds
    //how wide is the window?
    period?: number; //in seconds
    func?: AggregateFunc; //will default to mean
    dont_mix?: InfluxColumn[];
  };
}

//wait for implementation
export interface CombinationGraphResponse {
  line: {
    [fieldName: string]: [string, number][];
  };
  bar: {
    [fieldName: string]: [string, number, string][];
  };
}

export interface TrainingSessionsGetInterface {
  teamName: string;
  sessionName: string;
}
const apiMethods = {
  //player
  getCurrentPlayer: async () => {
    return axios
      .get(`/api/profile`)
      .then((response) => response.data as ProfileResponse);
  },
  getPlayer: async (userID: string) => {
    return axios
      .get(`/api/profile/${userID}`)
      .then((response) => response.data as ProfileResponse);
  },
  putPlayer: async (player: Partial<ProfileResponse>) => {
    return axios
      .put(`/api/profile`, player)
      .then((response) => console.log(response))
      .catch((err) => console.log(err));
  },
  //training session
  getTrainingSession: async (
    names?: string[],
    teams?: string[],
    sessions?: string[]
  ) => {
    return axios
      .post("/api/trainingSessions", {
        names: names,
        teams: teams,
        sessions: sessions,
      })
      .then((response) => {
        return response.data as ProfileResponse["trainingSessions"];
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

  //line graph
  getLineGraphStatistic: async (
    teamReq?: string[],
    nameReq?: string[],
    sessionReq?: string[],
    funcReq?: string
  ) => {
    return axios
      .post("/api/lineGraph", {
        sessions: sessionReq, // [sessionName]
        names: nameReq, //[]
        teams: teamReq, // []
        fields: ["Velocity", "Height", "Distance"],
        aggregate: { func: funcReq || "mean" }, // funcReq default to average
        // time_window: { func: funcReq || "mean" },
      })
      .then((response) => response.data as StatisticData);
  },
  //composed graph

  getCombinationGraphStatistic: async (
    teamReq?: string[],
    nameReq?: string[],
    sessionReq?: string[],
    funcReq?: string
  ) => {
    return axios
      .post("/api/combinationGraph", {
        sessions: sessionReq, // [sessionName]
        names: nameReq, //[]
        teams: teamReq, // []
        fields: ["Velocity", "Height", "Distance"],
        aggregate: { func: funcReq || "mean" }, // funcReq default to average
        // time_window: { func: funcReq || "mean" },
      })
      .then((response) => response.data as CombinationGraphResponse);
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
