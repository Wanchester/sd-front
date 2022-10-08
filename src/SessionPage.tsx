import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiMethods, { ProfileResponse } from "./API";
import { Table, Col, Container } from "react-bootstrap";
import { LoadingSpinner } from "./components/loadingSpinner/LoadingSpinner";
import GraphContainer from "./components/graphContainer/GraphContainer";
import Header from "./components/header/Header";
import SortableTableModified from "./components/sortTableModified/SortableTableModified";

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
  const [playerData, setPlayerData] = useState(
    null as Record<string, string | number>[] | null
  );

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
    const tableData: Record<string, string | number>[] = [];
    if (sessionName) {
      apiMethods
        .getLineGraphStatistic([], [], [sessionName], undefined, undefined)
        .then((data) => {
          console.log(data);
          Object.entries(data).map((entry) => {
            tableData.push({
              playerName: entry[0],
              ...Object.fromEntries(
                Object.entries(entry[1]).map((arr) => [
                  arr[0],
                  arr[1].length > 0
                    ? arr[1].map((val) => {
                        if (val) {
                          return val[1];
                        } else {
                          return 0;
                        }
                      })
                    : 0,
                ])
              ),
            });
            console.log(tableData);
          });
        });

      setPlayerData(tableData);
    }
  }, [sessionName]);

  return (
    <Container fluid>
      {trainingSession && playerData ? (
        <>
          {sessionName && (
            <Col>
              {sessionName && (
                <Header content={sessionName} userRole={user.role} />
              )}
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
              <Container fluid>
                {playerData && (
                  <SortableTableModified
                    data={playerData}
                    header={[
                      { key: "playerName", label: "Player Name" },
                      { key: "Velocity", label: "Velocity" },
                      { key: "Distance", label: "Distance" },
                      { key: "Height", label: "Height" },
                    ]}
                  />
                )}
              </Container>
            </>
          ) : (
            <>{error}</>
          )}
        </>
      ) : (
        <LoadingSpinner />
      )}
    </Container>
  );
};
export default SessionPage;
