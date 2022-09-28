import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiMethods, { ProfileResponse } from "./API";
import { Table, Row } from "react-bootstrap";
import GraphContainer from "./components/graphContainer/GraphContainer";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";

const SessionPage = () => {
  const { sessionName } = useParams();
  const [trainingSession, setTrainingSession] = useState(
    null as ProfileResponse["trainingSessions"] | null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionName) {
      apiMethods
        .getTrainingSession([], [], [sessionName])
        .then((session) => {
          setTrainingSession(session);
        })
        .catch((e) => {
          console.error(e);
          setError(e.response.data.error);
        });
    }
  }, [sessionName]);
  return (
    <>
      <Row className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
        <Breadcrumbs />
      </Row>
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
