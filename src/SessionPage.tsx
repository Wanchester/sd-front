import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiMethods, { ProfileResponse } from "./API";
import { Table, Col } from "react-bootstrap";
import GraphContainer from "./components/graphContainer/GraphContainer";
import Header from "./components/header/Header";

export interface TableData {
  playerName: string;
  [key: string]: string | number;
}

const SessionPage = ({ user }: { user: ProfileResponse }) => {
  const { sessionName } = useParams();
  const [trainingSession, setTrainingSession] = useState(
    null as ProfileResponse["trainingSessions"] | null
  );
  const [error, setError] = useState("");
  const [playerData, setPlayerData] = useState(null as TableData[] | null);

  useEffect(() => {
    if (sessionName) {
      apiMethods
        .getTrainingSession(
          user.role === "player" ? undefined : [],
          [],
          [sessionName]
        )
        .then((session) => {
          setTrainingSession(session);
        })
        .catch((e) => {
          console.error(e);
          setError(e.response.data.error);
        });
    }
  }, [sessionName, user.name, user.role]);

  useEffect(() => {
    const tableData: TableData[] = [];
    if (sessionName) {
      apiMethods
        .getLineGraphStatistic(
          undefined,
          undefined,
          [sessionName],
          undefined,
          undefined
        )
        .then((data) =>
          Object.entries(data).map((entry) => {
            tableData.push({
              playerName: entry[0],
              ...Object.fromEntries(
                Object.entries(entry[1]).map((arr) => [arr[0], arr[1][1]])
              ),
            });
          })
        );
      if (tableData) setPlayerData(tableData);
    }
  }, [playerData, sessionName]);
  return (
    <>
      {sessionName && (
        <Col>
          <Header content={sessionName} />
        </Col>
      )}
      {trainingSession ? (
        <>
          {trainingSession.map((s) => {
            <>
              <h1>{s.sessionName}</h1>
              <h2>{s.sessionStart}</h2>
              <h2>{s.sessionStop}</h2>
              <h2>{s.teamName}</h2>
              <h2>{s.duration}</h2>
            </>;
          })}
          <Table responsive bordered>
            {sessionName && (
              <GraphContainer isLine={true} sessionReq={[sessionName]} />
            )}
          </Table>

          <Table responsive bordered>
            {sessionName && <GraphContainer sessionReq={[sessionName]} />}
          </Table>
        </>
      ) : (
        <>{error}</>
      )}
    </>
  );
};
export default SessionPage;
