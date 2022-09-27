import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiMethods, { TrainingSession } from "./API";
import { Table, Row } from "react-bootstrap";
import GraphContainer from "./components/graphContainer/GraphContainer";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";

const SessionPage = () => {
  const { sessionName, team } = useParams();
  const [trainingSession, setTrainingSession] = useState(
    null as TrainingSession | null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionName && team) {
      apiMethods
        .getTrainingSession(sessionName, team)
        .then((session) => {
          setTrainingSession(session);
        })
        .catch((e) => {
          console.error(e);
          setError(e.response.data.error);
        });
    }
  }, [sessionName, team]);
  return (
    <>
      <Row className="flex-grow-1" sm={6} md={4} lg={3} xl={2}>
        <Breadcrumbs />
      </Row>
      {trainingSession ? (
        <>
          <h1>{trainingSession.sessionName}</h1>
          <h2>{trainingSession.sessionStart}</h2>
          <h2>{trainingSession.sessionStop}</h2>
          <h2>{trainingSession.teamName}</h2>
          <h2>{trainingSession.duration}</h2>
          <Table responsive bordered>
            <GraphContainer sessionReq={[trainingSession.sessionName]} />
          </Table>
        </>
      ) : (
        <>{error}</>
      )}
    </>
  );
};
export default SessionPage;
