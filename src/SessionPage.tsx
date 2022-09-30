import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiMethods, { ProfileResponse } from "./API";
import { Table, Col } from "react-bootstrap";
import GraphContainer from "./components/graphContainer/GraphContainer";
import Header from "./components/header/Header";

const SessionPage = ({ user }: { user: ProfileResponse }) => {
  const { sessionName } = useParams();
  const [trainingSession, setTrainingSession] = useState(
    null as ProfileResponse["trainingSessions"] | null
  );
  const [error, setError] = useState("");

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
